'use strict';
var gulp = require('gulp');
var notify = require('gulp-notify');
var minifyHTML = require('gulp-minify-html');
var size = require('gulp-filesize');

// Minifying html
gulp.task('minHtml', function() {
	return gulp.src('build/*.html')
	.pipe(minifyHTML())
	.pipe(size())
	.pipe(notify({
		'subtitle': 'Gulp Process',
		'message': '<%= file.relative %> was successfully minified HTML!',
		'sound': 'Beep',
		'onLast': true
	}))
	.pipe(gulp.dest('public'));
});