'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var src = {};
var jadeInheritance = require('gulp-jade-inheritance');
var jade = require('gulp-jade');
var changed = require('gulp-changed');
var cached = require('gulp-cached');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var errorHandler = require('../utils/errorHandler');

// Compile jade
gulp.task('jade', function() {
	return gulp.src(
		[
			'assets/**/**/**/*.jade'
		]
	)
	.pipe(plumber({errorHandler: onError}))
	// only pass unchanged *main* files and *all* the partials
	.pipe(changed('public', {extension: '.html'}))
	// filter out unchanged partials, but it only works when watching
	.pipe(gulpif(global.isWatching, cached('jade')))
	// find files that depend on the files that have changed
	.pipe(jadeInheritance({basedir: 'assets'}))
	// filter out partials (folders and files starting with "_" )
	.pipe(filter(function (file) {
		return !/\/_/.test(file.path) && !/^_/.test(file.relative);
	}))
	.pipe(jade({
		pretty: true,
		basedir: 'assets'
	}))
	.pipe(gulp.dest('public'));
});
gulp.task('setWatch', function() {
	global.isWatching = true;
});