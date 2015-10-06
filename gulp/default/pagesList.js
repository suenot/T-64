'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var reload = browserSync.reload;
var rename = require('gulp-rename');
var src = {};

// Creat index.html
// gulp.task('index', function() {
// 	return gulp.src('assets/pages/_index.jade')
// 	.pipe(plumber({errorHandler: onError}))
// 	.pipe(jade({
// 		pretty: true,
// 		basedir: 'assets'
// 	}))
// 	// .pipe(rename('index.html'))
// 	.pipe(gulp.dest('public'))
// 	.pipe(browserSync.reload({stream: true}));
// });

// Build complite jade and inject links css
gulp.task('pagesList', ['jade'], function() {
	var pages = gulp.src([
		'./public/*.html',
		'!./public/i.html'
	], {read: false});
	return gulp.src([
		'./public/i.html'
	])
	.pipe(plumber({errorHandler: onError}))
	.pipe(inject(pages, {
		name: 'pages',
		transform: function(filepath) {
			var filepath = filepath.substring(7);
			var filename = filepath.substring(7, filepath.length - 5).replace(filepath[7], filepath[7].toUpperCase())
			return '<li><a href="' + filepath + '">' + filepath + '</a></li>';
		}
	}))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}));
});