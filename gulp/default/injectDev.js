'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config = require('../utils/config');
var src = {};
var es = require('event-stream');
var foreach = require('gulp-foreach');
var each = require('async-each-series');

gulp.task('injectDev', ['jade'], function(done) {
	each(config.bundles, function(el, next) {
		gulp.src(el.pages)
		.pipe(plumber({errorHandler: onError}))
		.pipe(inject(gulp.src(el.css.concat(el.js), {read: false}), {
			name: el.name,
			ignorePath: 'public'
		}))
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream: true}))
		.on('finish', next);
	}, done());
});