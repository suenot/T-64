'use strict';

var runSequence = require('run-sequence');
var gulp = require('gulp');
var gutil = require('gulp-util');
require('require-dir')('./gulp/utils', {recurse: true});
// var prefix = require('./gulp/utils/config').prefix;
module.exports = {
	prefix: false
}

gulp.task('default', function(cb) {
	require('require-dir')('./gulp/default', {recurse: true});
	runSequence(
		'del',
		[
			'stylus',
			'app',
			'jade',
			'font',
			'_images',
			'pagesList',
			'images'
		],
		[
			'webp',
			'injectDev'
		],
		[
			'watch',
			'server'
		],
		cb
	);
});

gulp.task('build', function(cb) {
	module.exports.prefix = true;
	require('require-dir')('./gulp/default', {recurse: true});
	require('require-dir')('./gulp/build', {recurse: true});
	runSequence(
		'del',
		[
			'stylus',
			'app',
			'jade'
		],
		[
			'pagesList',
			'font',
			'_images',
			'images',
			'webp',
			'minCss',
			'minJs',
			'doc'
		],
		[
			'injectProd',
		],
		[
			'minHtml',
			'watchBuild',
			'server'
		],
		cb
	);
});

gulp.task('danger', function(cb) {
	require('require-dir')('./gulp/default', {recurse: true});
	require('require-dir')('./gulp/build', {recurse: true});
	require('require-dir')('./gulp/danger', {recurse: true});
	runSequence(
		'del',
		[
			'stylus',
			'app',
			'jade'
		],
		[
			'pagesList',
			'font',
			'_images',
			'images',
			'webp',
			'minCss',
			'minJs',
			'doc'
		],
		[
			'injectProd',
			'imagemin',
			'imageminWebp',
		],
		[
			'minHtml',
			'server'
		],
		cb
	);
});