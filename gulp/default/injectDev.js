'use strict';
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var src = {};

// inject css, js
gulp.task('injectDev', ['jade'], function() {
	var libs = gulp.src(
		[
			'bower_components/normalize.css/normalize.css',
			'bower_components/bootstrap/dist/css/bootstrap.min.css',
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/jquery.browser/dist/jquery.browser.min.js',
			'bower_components/picturefill/dist/picturefill.min.js',
		], {read: false}
	);
	var sources = gulp.src(
		[
			'public/font/**/*.css',
			'public/app/**/*.{js,css}',
			'public/blocks/**/*.{js,css}'
		], {read: false}
	);
	return gulp.src(
		[
			'public/*.html',
			'!public/i.html'
		]
	)
	.pipe(plumber({errorHandler: onError}))
	.pipe(inject(libs, {
		name: 'libs',
	}))
	.pipe(inject(sources, {
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