'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var reload = browserSync.reload;
var src = {};

// Compile jade
gulp.task('jade', function() {
	return gulp.src(
		[
			'assets/pages/*.jade',
			'!assets/**/_*.jade',
			'!./assets/pages/blocks.jade'
		]
	)
	.pipe(plumber({errorHandler: onError}))
	.pipe(jade({
		pretty: true,
		basedir: 'assets'
	}))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}));
});