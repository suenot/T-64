'use strict';

var runSequence = require('run-sequence');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');

gulp.task('default', function(cb) {
	require('require-dir')('./gulp/default', {recurse: true});
	runSequence(
		'del',
		[
			'stylus',
			'app',
			'jade',
			'index'
		],
		[
			'font',
			'_images',
			'images',
			'webp'
		],
		'injectDev',
		'watch',
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
			'font',
			'_images',
			'index',
			'doc'
		],
		[
			'imagemin',
			'injectProd',
			'copy-img',
			'copy-font',
			'imageminWebpBuild'
		],
		'minHtml',
		"server",
		cb
	);
});

// TODO experimental tasks
// gulp.task('exp', function(cb) {
// 	require('require-dir')('./gulp/default', {recurse: true});
// 	require('require-dir')('./gulp/build', {recurse: true});
// 	require('require-dir')('./gulp/exp', {recurse: true});
// 	runSequence(
// 		'delbuld',
// 		[
// 			'concatCss',
// 			'minjs'
// 		],
// 		[
// 			'imagemin',
// 			'copy-img',
// 			'copy-font',
// 			'jadeBuild',
// 			'imageminWebpBuild'
// 		],
// 		'minify-html',
// 		'delmin',
// 		"serverbuild", cb
// 	);
// });