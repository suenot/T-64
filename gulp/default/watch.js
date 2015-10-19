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

gulp.task('watchBuild', ['setWatch'], function () {
	gulp.watch('assets/**/**/**/*.jade', ['jadeInjectBuild']);
	gulp.watch('assets/**/**/**/*.styl', ['stylusInjectBuild']);
	gulp.watch([
		'bower_components/**/**/**/**/**/**/*.js',
		'assets/**/**/**/*.js',
		'gulp/utils/config.js'
	], ['jsInjectBuild']);
	gulp.watch('assets/app/**/**/*', ['app']);
	gulp.watch('assets/img/**', ['images']);
	gulp.watch('assets/_img/**', ['_images']);
	gulp.watch('assets/font/*', ['font']);
	gulp.watch('assets/docs/**/*.*', ['docsFile']);
	gulp.watch('assets/*.jade', ['pageListInject']);
});

gulp.task('watchDanger', ['setWatch'], function () {
	gulp.watch('assets/**/**/**/*.jade', ['jadeInjectBuild']);
	gulp.watch('assets/**/**/**/*.styl', ['stylusInjectBuild']);
	gulp.watch([
		'bower_components/**/**/**/**/**/**/*.js',
		'assets/**/**/**/*.js',
		'gulp/utils/config.js'
	], ['jsInjectBuild']);
	gulp.watch('assets/app/**/**/*', ['app']);
	gulp.watch('assets/img/**', ['imageDanger']);
	gulp.watch('assets/_img/**', ['_imageDanger']);
	gulp.watch('assets/font/*', ['font']);
	gulp.watch('assets/docs/**/*.*', ['docsFile']);
	gulp.watch('assets/*.jade', ['pageListInject']);
});