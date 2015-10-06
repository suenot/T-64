'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config = require('../utils/config');
var src = {};
// var streamify  = require('gulp-streamify');
// var sourcemaps = require('gulp-sourcemaps');
// var derequire = require('gulp-derequire');
// var source = require('vinyl-source-stream');
// var buffer = require('vinyl-buffer');
var eachAsync = require('each-async');

gulp.task('injectDev', ['jade'], function(done) {
	eachAsync(config.bundles, function(item, i, next) {
		gulp.src(
			item.pages
		)
		.pipe(plumber({errorHandler: onError}))
		.pipe(inject(gulp.src(item.css.concat(item.js), {read: false}), {
			name: item.name,
			// removeTags: true,
			ignorePath: 'public'
		}))
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({stream: true}))
		.on('end', next);
	}, done());
});