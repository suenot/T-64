'use strict';

var runSequence = require('run-sequence');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', function(cb) {
	require('require-dir')('./gulp/default', {recurse: true});
	runSequence(
		'del',
		[
			'stylus',
			'app',
			'jade',
			'index',
			'font',
			'_images',
			'images'
		],
		[
			'pagesList',
			'webp',
			'injectDev',
			'watch'
		],
		'server',
		cb
	);
});

gulp.task('build', function(cb) {
	require('require-dir')('./gulp/default', {recurse: true});
	require('require-dir')('./gulp/build', {recurse: true});
	runSequence(
		'del',
		[
			'stylus',
			'app',
			'jade',
			'index'
		],
		[
			'pagesList',
			'font',
			'_images',
			'images',
			'webp'
		],
		[
			'concatCss',
			'minjs'
		],
		[
			'doc'
		],
		[
			'imagemin',
			'injectProd',
		],
		'minHtml',
		'server',
		cb
	);
});

gulp.task('danger', function(cb) {
	require('require-dir')('./gulp/default', {recurse: true});
	require('require-dir')('./gulp/build', {recurse: true});
	require('require-dir')('./gulp/danger', {recurse: true});
	runSequence(
		'build'
	);
});