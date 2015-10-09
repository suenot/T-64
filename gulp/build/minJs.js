'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concats = require('gulp-concat');
var streamqueue = require('streamqueue');
var src = {};
var config = require('../utils/config');
var each = require('async-each-series');

gulp.task('minJs', function(done) {
	each(config.bundles, function(bundle, next) {
		streamqueue(
			{objectMode: true},
			gulp.src(bundle.js)
		)
		.pipe(uglify())
		.pipe(concats(bundle.name + '.min.js'))
		.pipe(gulp.dest(bundle.buildTo))
		.on('finish', next);
	}, done());
});