'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var newer = require('gulp-newer');
var src = {};

// Sourse files
src.image = {
	'files': [
		'assets/img/**'
	],
	'dest': 'public/img'
};

src.app = {
	'files': [
		'assets/app/*.js',
		'assets/app/*.css',
	],
	'dest': 'public/app/'
};

src.font = {
	'files': [
		'assets/font/**'
	],
	'dest': 'public/font',
};

// Copy All Files At (images)
gulp.task('images', function() {
	return gulp.src(src.image.files)
	.pipe(newer('public/img'))
	.pipe(gulp.dest(src.image.dest))
	.pipe(browserSync.reload({stream: true}));
});

// Copy all images in _img
gulp.task('_images', function() {
	return gulp.src('assets/_img/**')
	.pipe(newer('public/_img'))
	.pipe(gulp.dest('public/_img'))
	.pipe(browserSync.reload({stream: true}));
});

// Copy All Files At (app)
gulp.task('app', function() {
	return gulp.src(src.app.files)
	.pipe(newer('public/app/'))
	.pipe(gulp.dest(src.app.dest))
	.pipe(browserSync.reload({stream: true}));
});

// Copy Web Fonts To Dist
gulp.task('font', function() {
	return gulp.src(src.font.files)
	.pipe(newer('public/font'))
	.pipe(gulp.dest(src.font.dest))
	.pipe(browserSync.reload({stream: true}));
});