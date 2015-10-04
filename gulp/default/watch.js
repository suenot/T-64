"use strict";
var gulp = require('gulp');

// Watch everything
gulp.task('watch', function() {
	gulp.watch('assets/blocks/**/*.styl',['stylus']);
	gulp.watch('assets/blocks/**/*.jade', ['jade']);
	gulp.watch('assets/app/**/**/*', ['app']);
	gulp.watch('assets/img/**', ['images']);
	gulp.watch('assets/_img/**', ['_images']);
	gulp.watch('assets/font/*', ['font']);
	gulp.watch('assets/app/*.styl', ['stylus']);
	gulp.watch('assets/pages/index.jade', ['index']);
	gulp.watch('assets/pages/_*.jade', ['jade']);
	gulp.watch('assets/docs/**', ['jade']);
	gulp.watch('assets/docs/**', ['stylus']);
	gulp.watch('assets/docs/**/*.*', ['docsFile']);
});