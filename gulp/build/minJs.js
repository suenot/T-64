'use strict';
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concats = require('gulp-concat');
var streamqueue = require('streamqueue');
var notify = require('gulp-notify');
var size = require('gulp-filesize');
var src = {};

src.libsJs = {
	'files': [
		'bower_components/jquery/dist/jquery.min.js',
		'bower_components/jquery.browser/dist/jquery.browser.min.js',
		'public/app/modernizr.js',
		'public/app/svg.js',
		'bower_components/picturefill/dist/picturefill.min.js'
	],
	'dest': 'public/app'
};

// Minify and concat js
gulp.task('minjs', function() {
	return streamqueue(
		{objectMode: true},
		gulp.src(src.libsJs.files)
	)
	.pipe(uglify())
	.pipe(concats('app.min.js'))
	.pipe(size())
	.pipe(notify({
		'subtitle': 'Gulp Process',
		'message': '<%= file.relative %> was successfully minified JS!',
		'sound': 'Beep',
		'onLast': true
	}))
	.pipe(gulp.dest(src.libsJs.dest));
});