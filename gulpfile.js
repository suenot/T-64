"use strict";
var isWin = /^win/.test(process.platform);
var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    autoprefixer = require('gulp-autoprefixer'),
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
    runSequence = require('gulp-run-sequence'),
    minifyHTML = require('gulp-minify-html'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imageminWebp = require('imagemin-webp'),
    jsmin = require('gulp-jsmin'),
    sftp = require('gulp-sftp'),
    googlecdn = require('gulp-google-cdn');

// Error options
var onError = function(err) {
  gutil.beep(),
  gutil.log(gutil.colors.red(err))
};

// Gulp --open open browser page localhost:3000
var serverOpen = false,
    reloadBrowser = false;
if(gutil.env.open === true){
  serverOpen = true;
};
if(gutil.env.live === true){
  reloadBrowser = true;
};
// Sourse files
var date        = new Date().toLocaleString(),
    src         = {};

src.styl = {
    'files': [
        'assets/app/**/*.styl'
    ],
    'dest': 'public/app',
    'name': 'all.min.css',
    'ignore': 'assets/**/_*.styl'
};

src.jade = {
    'files': [
        'assets/**/*.jade'
    ],
    'dest': 'public/',
    'ignore': [
    'assets/**/_*.jade',
    'assets/pages/index.jade',
    'assets/pages/blocks.jade'
    ]
};

src.image = {
    'files': [
        'assets/img/**'
    ],
    'dest': 'public/img',
    'ignore': [
    'assets/img/svg',
    'assets/img/png'
    ]
};

src.app = {
    'files': [
        'assets/app/*.js',
        'assets/app/*.css'
    ],
    'dest': 'public/app'
};

// Ignored files
src.styl.files.push('!'+src.styl.ignore);
src.jade.files.push('!'+src.jade.ignore);
src.image.files.push('!'+src.image.ignore);
// if (!isWin) {
//     var filter = require('gulp-filter');
//     var svgSprite = require('gulp-svg-sprites');
//     var svg2png = require('gulp-svg2png');
//     gulp.task('svg-symbols', function () {
//          return gulp.src('assets/img/svg/*.svg')
//             .pipe(svgSprite({
//                 svg: {
//                     sprite: 'sprite.svg'
//                 },
//                 preview: {
//                     sprite: 'index.html'
//                 },
//                 mode: 'symbols'
//             }))
//             .pipe(gulp.dest('assets/img/svg-symbols'));
//     });
//     gulp.task('svg-sprite', function () {
//          return gulp.src('assets/img/svg/*.svg')
//         .pipe(svgSprite())
//         .pipe(gulp.dest('assets/img/svg-sprite'))
//         .pipe(filter('**/*.svg'))
//         .pipe(svg2png())
//         .pipe(gulp.dest('assets/img/svg-sprite'));
//     });
//     gulp.task('svg', ['svg-symbols', 'svg-sprite']);
// };

// All browserSync
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: "public"
    },
    open: serverOpen,
    codeSync: reloadBrowser
  });
});


// Complite STYLUS and automatically Prefix CSS
gulp.task('stylus', function() {
  return gulp.src(src.styl.files)
        .pipe(plumber({errorHandler: onError}))
        .pipe(stylus())
        .pipe(autoprefixer({
                browsers: ['last 4 versions'],
                cascade: false
        }))
        .pipe(gulp.dest('public/app'))
        .pipe(browserSync.reload({stream: true}));
});

// Compile .webp of .jpeg
gulp.task('webp', function() {
  return gulp.src('assets/img/**/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('public/img'));
});

gulp.task('imageminWebp', ['webp'], function() {
  return gulp.src('public/img/**/*.webp')
    .pipe(imageminWebp({quality: 70})())
    .pipe(gulp.dest('public/img'));
});

// Complite html
gulp.task('jade', ['stylus'], function() {
  return gulp.src(src.jade.files)
    .pipe(plumber({errorHandler: onError}))
    .pipe(jade({
      pretty: true,
      basedir: 'assets'
    }))
    .pipe(googlecdn(require('./bower.json'), {
      cdn: require('cdnjs-cdn-data')
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({stream: true}));
});

// Creat index.html
gulp.task('index', function() {
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
gulp.task('blocks', ['jade'], function() {
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
gulp.task('images', function() {
  return gulp.src(src.image.files)
          .pipe(newer('public/img'))
          .pipe(gulp.dest('public/img'))
          .pipe(browserSync.reload({stream: true}));
});

// Minimize image size
gulp.task('imagemin', ['main'], function () {
    return gulp.src('public/img/**/*.*')
        .pipe(imagemin({
            use: [pngquant()],
            progressive: true,
            optimizationLevel: 1,
            multipass: true,
            svgoPlugins: [
               // { cleanupAttrs: false },
               // { removeDoctype: false },
               // { removeXMLProcInst: false },
               // { removeComments: false },
               // { removeMetadata: false },
               // { removeTitle: false },
               // { removeDesc: false },
               // { removeUselessDefs: false },
               // { removeEditorsNSData: false },
               // { removeEmptyAttrs: false },
               // { removeHiddenElems: false },
               // { removeEmptyText: false },
               // { removeEmptyContainers: false },
               { removeViewBox: false }
               // { cleanUpEnableBackground: false },
               // { convertStyleToAttrs: false },
               // { convertColors: false },
               // { convertPathData: false },
               // { convertTransform: false },
               // { removeUnknownsAndDefaults: false },
               // { removeNonInheritableGroupAttrs: false },
               // { removeUselessStrokeAndFill: false },
               // { removeUnusedNS: false },
               // { cleanupIDs: false },
               // { cleanupNumericValues: false },
               // { moveElemsAttrsToGroup: false },
               // { moveGroupAttrsToElems: false },
               // { collapseGroups: false },
               // { removeRasterImages: false },
               // { mergePaths: false },
               // { convertShapeToPath: false },
               // { sortAttrs: false },
               // { transformsWithOnePath: false },
               // { removeDimensions: false },
               // { removeAttrs: false },
               // { addClassesToSVGElemen: false }
            ]
        }))
        .pipe(gulp.dest('public/img'));
});

// Copy all images in _img
gulp.task('_images', function() {
  return gulp.src('assets/_img/**')
          .pipe(newer('public/_img'))
          .pipe(gulp.dest('public/_img'))
          .pipe(browserSync.reload({stream: true}));
});

// Copy All Files At (app)
gulp.task('app', function() {
  return gulp.src(src.app.files)
          .pipe(newer('public/app'))
          .pipe(gulp.dest('public/app'))
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

// Delete in public all files before start gulp
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
  gulp.watch('assets/app/*.styl', ['stylus']);
  gulp.watch('assets/pages/*',['blocks']);
  gulp.watch('assets/pages/index.jade', ['index']);
  gulp.watch('assets/pages/_*.jade', ['jade']);
  gulp.watch('assets/docs/**', ['jade']);
  gulp.watch('assets/docs/**', ['stylus']);
  gulp.watch('assets/docs/**/*.*', ['docsFile']);
});

// BUILD
gulp.task('uncss', ['main'], function() {
  return gulp.src(['public/app/*.css', '!public/app/app.css'])
  .pipe(uncss({
    html: ['public/pages/main.html']
  }))
  .pipe(gulp.dest('public/app/'));
});

// minify js using gulp
gulp.task('minjs', ['main'], function () {
    gulp.src('public/app/*.js')
      .pipe(jsmin())
      .pipe(gulp.dest('public/app'));
});

// Minifying html
gulp.task('minify-html', ['uncss'], function() {
  return gulp.src('public/pages/*.html')
    .pipe(minifyHTML())
    .pipe(gulp.dest('public/pages'));
});

// Add all css in one
gulp.task('concatCss', ['uncss'], function () {
  return gulp.src(['http://fonts.googleapis.com/css?family=Open+Sans:600italic,400&subset=latin,cyrillic-ext,cyrillic,latin-ext', 'public/app/bootstrap.min.css', 'public/app/*.css', 'public/font/*.css'])
    .pipe(concatCss('concat.css'))
    .pipe(gulp.dest('public/app/'));
});

// In Build task delete all files in public that are not needed
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

gulp.task('sftp', ['build'], function () {
  return gulp.src('public/**/*')
    .pipe(sftp({
      host: '185.5.250.59',
      user: 'frontend',
      pass: 'chebur829',
      remotePath: '/home/frontend/sites/prestapro.ru'
    }));
});

gulp.task('main', function(cb) {
  runSequence('del', ['jade', 'stylus', 'app', 'images', 'font', '_images', 'webp', 'index', 'blocks', 'docs', 'docsFile'], cb);
});
gulp.task('default', function(cb) {
  runSequence('main', 'watch', 'server', cb);
});
gulp.task('build', ['main', 'minjs', 'imageminWebp', 'imagemin', 'uncss', 'minify-html', 'concatCss', 'delBuild', 'postcss']);
