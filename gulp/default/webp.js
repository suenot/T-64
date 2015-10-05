'use strict';
var gulp = require('gulp');
var webp = require('gulp-webp');

gulp.task('webp', ['images'], function() {
	return gulp.src('assets/img/**/*.jpg')
	.pipe(webp())
	.pipe(gulp.dest('public/img'));
});