"use strict";

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    reload = browserSync.reload,
    rev = require('gulp-rev-append'),
    webp = require('gulp-webp'),
    uncss = require('gulp-uncss'),
    fs = require("fs"),
    postcss = require('gulp-postcss'),
    googlecdn = require('gulp-google-cdn');

// All browserSync
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: "public"
    }
  });
});

// gulp.task('cdn', function () {
//   return gulp.src('index.html')
//     .pipe(googlecdn(require('./bower.json')))
//     .pipe(gulp.dest('dist'));
// });

// Complite STYLUS and automatically Prefix CSS
gulp.task('stylus', function() {
  return gulp.src(['assets/app/**/*.styl', '!assets/**/_*.styl'])
            .pipe(stylus())
            .pipe(plumber())
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
        .pipe(gulp.dest('public/app'))
        .pipe(browserSync.reload({stream: true}));
    });

gulp.task('webp', function() {
  return gulp.src('assets/img/cards/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('public/img/cards'));
});

// Complite html
gulp.task('jade', ['stylus'], function() {
  return gulp.src(['assets/**/*.jade', '!assets/**/_*.jade', '!assets/pages/index.jade', '!./assets/pages/blocks.jade'])
            .pipe(jade({
              pretty: true,
              basedir: 'assets'
            }))
          .pipe(googlecdn(require('./bower.json'), {
            cdn: require('cdnjs-cdn-data')
          }))
          .pipe(plumber())
          .on('error', console.error.bind(console))
          .pipe(rev())
          .pipe(gulp.dest('./public/'))
          .pipe(browserSync.reload({stream: true}));
          });

// Creat index.html
gulp.task('index', function() {
  return gulp.src('assets/pages/index.jade')
            .pipe(jade({
              pretty: true,
              basedir: 'assets'
            }))
          .pipe(plumber())
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('public'))
          .pipe(browserSync.reload({stream: true}));
          });

// Blocks
gulp.task('blocks', ['jade'], function() {
  return gulp.src('./assets/pages/blocks.jade')
            .pipe(jade({
              pretty: true,
              basedir: 'assets'
            }))
          .pipe(plumber())
          .on('error', console.error.bind(console))
          .pipe(gulp.dest('./public/pages/'))
          .pipe(browserSync.reload({stream: true}));
          });

// Copy All Files At (images)
gulp.task('images', function() {
  return gulp.src(['assets/img/**', '!assets/img/svg', '!assets/img/png'])
          .pipe(newer('public/img'))
          .pipe(gulp.dest('public/img'))
          .pipe(browserSync.reload({stream: true}));
      });

gulp.task('_images', function() {
  return gulp.src('assets/_img/**')
          .pipe(newer('public/_img'))
          .pipe(gulp.dest('public/_img'))
          .pipe(browserSync.reload({stream: true}));
      });

// Copy All Files At (app)
gulp.task('app', function() {
  return gulp.src(['assets/app/vendor/*.*', 'assets/app/vendor/**/*.*'])
          .pipe(newer('public/app/vendor'))
          .pipe(gulp.dest('public/app/vendor'))
          .pipe(browserSync.reload({stream: true}));
      });

// Copy Web Fonts To Dist
gulp.task('font', function() {
  return gulp.src('assets/font/**')
          .pipe(newer('public/font'))
          .pipe(gulp.dest('public/font'))
          .pipe(browserSync.reload({stream: true}));
      });

// Copy All blocks *.styl and *.jade At (blocks)
gulp.task('docs', function() {
  return gulp.src(['assets/blocks/*.*', 'assets/blocks/**/*.*'])
          .pipe(newer('public/blocks'))
          .pipe(gulp.dest('public/blocks'))
          .pipe(browserSync.reload({stream: true}));
      });

// Copy docs file functional At (docs)
gulp.task('docsFile', function() {
  return gulp.src(['assets/docs/*.css', 'assets/docs/*.js'])
          .pipe(newer('public/docs'))
          .pipe(gulp.dest('public/docs'))
          .pipe(browserSync.reload({stream: true}));
      });

// Watch everything
gulp.task('watch', function() {
  gulp.watch('assets/blocks/**/*.styl',['stylus']);
  gulp.watch('assets/blocks/**/*.jade', ['jade']);
  gulp.watch('assets/app/vendor/**/*.*', ['app']);
  gulp.watch('assets/img/**', ['images']);
  gulp.watch('assets/_img/**', ['_images']);
  gulp.watch('assets/font/*', ['font']);
  gulp.watch('assets/app/_*.styl', ['stylus']);
  gulp.watch('assets/pages/*',['blocks']);
  gulp.watch('assets/pages/index.jade', ['index']);
  gulp.watch('assets/pages/_*.jade', ['jade']);
  gulp.watch('assets/docs/**', ['jade']);
  gulp.watch('assets/docs/**', ['stylus']);
  gulp.watch('assets/docs/**/*.*', ['docsFile']);
});

// BUILD
gulp.task('uncss', ['app', 'jade', 'stylus'], function() {
  return gulp.src('public/app/vendor/**/*.css')
  .pipe(uncss({
    html: ['public/pages/main.html']
  }))
  .pipe(gulp.dest('public/app/vendor/'));
});

gulp.task('postcss', ['uncss'], function () {
    return gulp.src('public/app/**/*.css')
    .pipe(postcss([
      require('cssnext')(),
      require('css-mqpacker')(),
      require('postcss-zindex')(),
      require('postcss-discard-duplicates')(),
      require('postcss-discard-comments')({removeAll: true}),
      require('postcss-normalize-url')(),
      require('postcss-minify-selectors')(),
      require('postcss-pseudoelements')(),
      require('postcss-unique-selectors')(),
      require('postcss-colormin')(),
      require('postcss-merge-rules')(),
      require('postcss-discard-unused')(),
      require('postcss-reduce-idents')(),
      require('postcss-minify-font-weight')(),
      require('postcss-discard-empty')(),
      require('postcss-minify-trbl')(),
      require('postcss-font-family')(),
      require('postcss-single-charset')()
    ]))
    .pipe(postcss([
      require('cssnano')()
    ]))
    .pipe(gulp.dest('public/app'));
});

gulp.task('main', ['jade', 'stylus', 'app', 'images', 'font', '_images', 'webp', 'index', 'server', 'blocks', 'docs', 'docsFile']);
gulp.task('default', ['main', 'watch']);
gulp.task('build', ['main', 'uncss', 'postcss']);
