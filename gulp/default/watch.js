'use strict';
var gulp = require('gulp');

// Watch everything
gulp.task('watch', ['setWatch'], function() {
	gulp.watch('assets/**/**/**/*.jade', ['jadeInject']);
	gulp.watch('assets/**/**/**/*.styl', ['stylusInject']);
	gulp.watch([
		'bower_components/**/**/**/**/**/**/*.js',
		'assets/**/**/**/*.js',
		'gulp/utils/config.js'
	], ['jsInject']);
	gulp.watch('assets/app/**/**/*', ['app']);
	gulp.watch('assets/img/**', ['images']);
	gulp.watch('assets/_img/**', ['_images']);
	gulp.watch('assets/font/*', ['font']);
	gulp.watch('assets/docs/**/*.*', ['docsFile']);
	gulp.watch('assets/*.jade', ['pageListInject']);
});