"use strict";
var gulp = require('gulp');
var imageminWebp = require('imagemin-webp');
var webp = require('gulp-webp');

// Compile .webp of .jpeg
gulp.task('webp', ['images'], function() {
	return gulp.src('assets/img/**/*.jpg')
		.pipe(webp())
		.pipe(gulp.dest('public/img'));
});

gulp.task('imageminWebp', ['webp'], function() {
	return gulp.src('public/img/**/*.webp')
		.pipe(imageminWebp({quality: 70})())
		.pipe(gulp.dest('public/img'));
});

gulp.task('imageminWebpBuild', ['webp'], function() {
	return gulp.src('public/img/**/*.webp')
		.pipe(imageminWebp({quality: 70})())
		.pipe(gulp.dest('build/img'));
});