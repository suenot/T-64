'use strict';
var gulp = require('gulp');
var imageminWebp = require('imagemin-webp');

gulp.task('imageminWebp', function() {
	return gulp.src('public/img/**/*.webp')
	.pipe(imageminWebp({quality: 70})())
	.pipe(gulp.dest('public/img'));
});