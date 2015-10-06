'use strict';
var gulp = require('gulp');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var reload = browserSync.reload;
var src = {};

// Build complite jade and inject links css
gulp.task('injectProd', ['jade'], function() {
	var buildSource = gulp.src([
		'./public/app/app.min.js',
		'./public/app/main.min.css'
	], {read: false});
	return gulp.src([
		'public/*.html',
		'!public/i.html'
	])
	.pipe(plumber({errorHandler: onError}))
	.pipe(inject(buildSource, {
		transform: function(filepath) {
			var str = filepath;
			var res = str.substring(7);
			if (filepath.slice(-3) === '.js') {
					return '<script src="' + res + '"></script>';
			} else if(filepath.slice(-4) === '.css') {
					return '<link rel="stylesheet" href="' + res + '">';
			}
			return inject.transform.apply(inject.transform, arguments);
		}
	}))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}));
});