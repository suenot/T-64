'use strict';
var gulp = require('gulp');
var newer = require('gulp-newer');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var errorHandler = require('../utils/errorHandler');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var src = {};
var browsers ={};


// Source files
src.styl = {
	'files': [
		'assets/**/**/*.styl'
	],
	'dest': 'public/app',
	'name': 'all.min.css',
	'ignore': 'assets/**/_*.styl'
};

// Ignored files
src.styl.files.push('!'+src.styl.ignore);

// Options autoprefixer version browsers
var autoprefixerOptions = {
	browsers: [
		'android > 4',
		'chrome > 42',
		'firefox > 37',
		'ie > 7',
		'ios > 7',
		'opera > 28',
		'safari > 7'
	],
	cascade: false
};

// Complite stylus and automatically prefix css
gulp.task('stylus', function() {
	return gulp.src(src.styl.files)
	.pipe(plumber({errorHandler: onError}))
	.pipe(stylus())
	.pipe(postcss([
		autoprefixer(autoprefixerOptions)
	]))
	.pipe(gulp.dest('public'))
	.pipe(browserSync.reload({stream: true}));
});