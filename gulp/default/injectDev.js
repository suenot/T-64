'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var src = {};
var config = require('../utils/config');
var each = require('async-each-series');
var runSequence = require('run-sequence');

gulp.task('injectDev', function(done) {
	each(config.bundles, function(bundle, next) {
		gulp.src(bundle.pages)
		.pipe(plumber({errorHandler: onError}))
		.pipe(inject(gulp.src(bundle.css.concat(bundle.js), {read: false}), {
			name: bundle.name,
			ignorePath: 'public'
		}))
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream: true}))
		.on('finish', next);
	}, done());
});

gulp.task('jadeInject', function(cb) {
	runSequence(
		'jade',
		'injectDev',
		cb
	);
});

gulp.task('stylusInject', function(cb) {
	runSequence(
		'stylus',
		'injectDev',
		cb
	);
});
gulp.task('jsInject', function(cb) {
	runSequence(
		'app',
		'injectDev',
		cb
	);
});
gulp.task('pageListInject', function(cb) {
	runSequence(
		'jade',
		'injectDev',
		'pagesList',
		cb
	);
});
