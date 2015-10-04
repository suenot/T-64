"use strict";
var gulp = require('gulp');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var inject = require('gulp-inject');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var reload = browserSync.reload;
var src = {};

// Sourse files
var libs = gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css',
					'bower_components/jquery/dist/jquery.min.js',
					'bower_components/jquery.browser/dist/jquery.browser.min.js',
					'bower_components/normalize.css/normalize.css',
					'bower_components/picturefill/dist/picturefill.min.js'], {read: false});

var sources = gulp.src(['public/font/**/*.css',
						'public/app/**/*.{js,css}',
						'public/blocks/**/*.css'], {read: false});

// Complite JADE and inject links CSS
gulp.task('jade', function() {
	return gulp.src(['assets/pages/*.jade',
					'!assets/**/_*.jade',
					'!assets/pages/index.jade',
					'!./assets/pages/blocks.jade'])
			.pipe(plumber({errorHandler: onError}))
			.pipe(jade({
				pretty: true,
				basedir: 'assets'
			}))
			.pipe(inject(libs, {
				name: 'libs',
			}))
			.pipe(inject(sources , {
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
			.pipe(gulp.dest('public/pages'))
			.pipe(browserSync.reload({stream: true}));
});

// Build complite JADE and inject links CSS
gulp.task('jadeBuild', ['concatCss', 'minjs'], function() {

	var buildSource = gulp.src(['./build/app/app.min.js',
								'./build/app/main.min.css'], {read: false});

	return gulp.src(['assets/pages/*.jade',
					'!assets/**/_*.jade',
					'!assets/pages/index.jade',
					'!./assets/pages/blocks.jade'])
			.pipe(plumber({errorHandler: onError}))
			.pipe(jade({
				pretty: true,
				basedir: 'assets'
			}))
			.pipe(inject(buildSource , {
				transform: function(filepath) {
						var str = filepath;
						var res = str.substring(6);
						if (filepath.slice(-3) === '.js') {
								return '<script src="' + res + '"></script>';
						} else if(filepath.slice(-4) === '.css') {
								return '<link rel="stylesheet" href="' + res + '">';
						}
						return inject.transform.apply(inject.transform, arguments);
				}
			}))
			.pipe(gulp.dest('build/pages'))
			.pipe(browserSync.reload({stream: true}));
});