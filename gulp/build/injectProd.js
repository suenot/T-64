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

gulp.task('injectProd', function(done) {
	each(config.bundles, function(bundle, next) {
		gulp.src(bundle.pages)
		.pipe(plumber({errorHandler: onError}))
		.pipe(inject(gulp.src(bundle.build, {read: false}), {
			removeTags: true,
			name: bundle.name,
			ignorePath: 'public'
		}))
		.pipe(gulp.dest(bundle.destHtml))
		.pipe(browserSync.reload({stream: true}))
		.on('finish', next);
	}, done);
});

gulp.task('jadeInjectBuild', function(cb) {
	runSequence(
		'jade',
		'minHtml',
		'injectProd',
		'reload',
		cb
	);
});

gulp.task('stylusInjectBuild', function(cb) {
	runSequence(
		'stylus',
		'minCss',
		'injectProd',
		'reload',
		cb
	);
});

gulp.task('jsInjectBuild', function(cb) {
	runSequence(
		'app',
		'minJs',
		'injectProd',
		cb
	);
});

gulp.task('imageDanger', function(cb) {
	runSequence(
		'images',
		'imagemin',
		'imageminWebp',
		cb
	);
});

gulp.task('_imageDanger', function(cb) {
	runSequence(
		'_images',
		'imagemin',
		'imageminWebp',
		cb
	);
});