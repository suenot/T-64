'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var src = {};
var config = require('../utils/config');
var each = require('async-each-series');

gulp.task('injectProd', function(done) {
	each(config.bundles, function(bundle, next) {
		gulp.src(bundle.pages)
		.pipe(plumber({errorHandler: onError}))
		.pipe(inject(gulp.src(bundle.build, {read: false}), {
			name: bundle.name,
			ignorePath: 'public'
		}))
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream: true}))
		.on('finish', next);
	}, done());
});