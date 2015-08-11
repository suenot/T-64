"use strict";
var isWin = /^win/.test(process.platform);
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
    gulpif = require('gulp-if'),
    gutil = require('gulp-util'),
    del = require('del'),
    vinylPaths = require('vinyl-paths'),
    googlecdn = require('gulp-google-cdn');

var onError = function(err) {
  gutil.beep();
};

if (!isWin) {
  console.log('not win')
    var filter = require('gulp-filter');
    var svgSprite = require('gulp-svg-sprites');
    var svg2png = require('gulp-svg2png');
    gulp.task('svg-symbols', function () {
         return gulp.src('assets/img/svg/source/*.svg')
            .pipe(svgSprite({
                svg: {
                    sprite: 'sprite.svg'
                },
                preview: {
                    sprite: 'index.html'
                },
                mode: 'symbols'
            }))
            .pipe(gulp.dest('assets/img/svg/symbols'));
    });
    gulp.task('svg-sprite', function () {
         return gulp.src('assets/img/svg/source/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest('assets/img/svg/sprite'))
        .pipe(filter('**/*.svg'))
        .pipe(svg2png())
        .pipe(gulp.dest('assets/img/svg/sprite'));
    });
    gulp.task('svg', ['svg-symbols', 'svg-sprite']);
};

// All browserSync
gulp.task('server', ['del'], function() {
  browserSync({
    server: {
      baseDir: "public"
    }
  });
});


// Complite STYLUS and automatically Prefix CSS
gulp.task('stylus', ['del'], function() {
  return gulp.src(['assets/app/**/*.styl', '!assets/**/_*.styl'])
        .pipe(plumber({errorHandler: onError}))
        .pipe(stylus())
        .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
            }))
        .pipe(gulp.dest('public/app'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('webp', ['del'], function() {
  return gulp.src('assets/img/cards/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('public/img/cards'));
});

// Complite html
gulp.task('jade', ['stylus', 'del'], function() {
  return gulp.src(['assets/**/*.jade', '!assets/**/_*.jade', '!assets/pages/index.jade', '!./assets/pages/blocks.jade'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(jade({
      pretty: true,
      basedir: 'assets'
    }))
    .pipe(googlecdn(require('./bower.json'), {
      cdn: require('cdnjs-cdn-data')
    }))
    // .pipe(rev())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream: true}));
});

// Creat index.html
gulp.task('index', ['del'], function() {
  return gulp.src('assets/pages/index.jade')
          .pipe(plumber({errorHandler: onError}))
          .pipe(jade({
            pretty: true,
            basedir: 'assets'
          }))
          .pipe(gulp.dest('public'))
          .pipe(browserSync.reload({stream: true}));
});

// Blocks
gulp.task('blocks', ['jade', 'del'], function() {
  return gulp.src('./assets/pages/blocks.jade')
          .pipe(plumber({errorHandler: onError}))
          .pipe(jade({
            pretty: true,
            basedir: 'assets'
          }))
          .pipe(gulp.dest('./public/pages/'))
          .pipe(browserSync.reload({stream: true}));
});

// Copy All Files At (images)
gulp.task('images', ['del'], function() {
  return gulp.src(['assets/img/**', '!assets/img/svg', '!assets/img/png'])
          .pipe(newer('public/img'))
          .pipe(gulp.dest('public/img'))
          .pipe(browserSync.reload({stream: true}));
});

gulp.task('_images', ['del'], function() {
  return gulp.src('assets/_img/**')
          .pipe(newer('public/_img'))
          .pipe(gulp.dest('public/_img'))
          .pipe(browserSync.reload({stream: true}));
});

// Copy All Files At (app)
gulp.task('app', ['del'], function() {
  return gulp.src(['assets/app/*.js', 'assets/app/*.css'])
          .pipe(newer('public/app'))
          .pipe(gulp.dest('public/app'))
          .pipe(browserSync.reload({stream: true}));
});

// Copy Web Fonts To Dist
gulp.task('font', ['del'], function() {
  return gulp.src('assets/font/**')
          .pipe(newer('public/font'))
          .pipe(gulp.dest('public/font'))
          .pipe(browserSync.reload({stream: true}));
});

// Copy All blocks *.styl and *.jade At (blocks)
gulp.task('docs', ['del'], function() {
  return gulp.src(['assets/blocks/*.*', 'assets/blocks/**/*.*'])
          .pipe(newer('public/blocks'))
          .pipe(gulp.dest('public/blocks'))
          .pipe(browserSync.reload({stream: true}));
});

// Copy docs file functional At (docs)
gulp.task('docsFile', ['del'], function() {
  return gulp.src(['assets/docs/*.css', 'assets/docs/*.js'])
          .pipe(newer('public/docs'))
          .pipe(gulp.dest('public/docs'))
          .pipe(browserSync.reload({stream: true}));
});

gulp.task('del', function () {
  return gulp.src(['public/*', '!public/CNAME', '!public/.git'])
    .pipe(vinylPaths(del));
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
gulp.task('uncss', ['main'], function() {
  return gulp.src(['public/app/*.css', '!public/app/app.css', '!public/app/animate.css'])
  .pipe(uncss({
    html: ['public/pages/main.html']
  }))
  .pipe(gulp.dest('public/app/'));
});

gulp.task('concatCss', ['uncss'], function () {
  return gulp.src(['public/app/bootstrap.min.css', 'public/app/*.css'])
    .pipe(concatCss('concat.css'))
    .pipe(gulp.dest('public/app/'));
});

gulp.task('delBuild', ['concatCss'], function () {
  return gulp.src(['public/app/*.css', '!public/app/concat.css'])
    .pipe(vinylPaths(del));
});


gulp.task('postcss', ['concatCss'], function () {
    return gulp.src('public/app/concat.css')
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
gulp.task('build', ['main', 'uncss', 'concatCss', 'delBuild', 'postcss']);
