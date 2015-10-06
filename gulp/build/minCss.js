'use strict';
var gulp = require('gulp');
var concats = require('gulp-concat');
var streamqueue = require('streamqueue');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var uncss = require('gulp-uncss');
var size = require('gulp-filesize');
var del = require('del');
var src = {};

var options = [
	// require('cssnano')(),
	// require('cssnext')(),
	// require('css-mqpacker')(),
	// require('postcss-merge-rules')(),
	require('postcss-zindex')(),
	require('postcss-discard-duplicates')(),
	require('postcss-discard-comments')({removeAll: true}),
	require('postcss-normalize-url')(),
	require('postcss-minify-selectors')(),
	require('postcss-pseudoelements')(),
	require('postcss-unique-selectors')(),
	require('postcss-colormin')(),
	require('postcss-discard-unused')(),
	require('postcss-reduce-idents')(),
	require('postcss-minify-font-weight')(),
	require('postcss-discard-empty')(),
	require('postcss-minify-trbl')(),
	require('postcss-font-family')(),
	require('postcss-single-charset')()
];

src.buildConcat = {
	'files': [
		'public/app/libs.min.css',
		'public/app/app.min.css'
	],
	'dest': 'public/app'
};

src.libsCss = {
	'files': [
		'bower_components/normalize.css/normalize.css',
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'public/font/*.css',
		'public/app/animate.css'
	],
	'dest': 'public/app'
};

src.appCss = {
	'files': [
		'public/app/app.css',
		'public/blocks/**/*.css'
	],
	'dest': 'public/app'
};

// Concat all mifiy bower components
gulp.task('concatLibs', function () {
	return streamqueue(
		{ objectMode: true },
		gulp.src(src.libsCss.files)
	)
	.pipe(uncss({
		html: ['public/index.html']
	}))
	.pipe(concats('libs.min.css'))
	.pipe(notify({
		'message': '<%= file.relative %> Concat all mifiy bower components and minified CSS!',
		'subtitle': 'Gulp Process',
		'sound': 'Beep',
		'onLast': true
	}))
	.pipe(gulp.dest(src.libsCss.dest));
});

// Concat app.css and all css in folder blocks
gulp.task('concatApp', function () {
	return streamqueue(
		{ objectMode: true },
		gulp.src(src.appCss.files)
	)
	.pipe(concats('app.min.css'))
	.pipe(postcss(options))
	.pipe(notify({
		'subtitle': 'Gulp Process',
		'message': '<%= file.relative %> Concat app.css and all css in folder blocks and minified CSS!',
		'sound': 'Beep',
		'onLast': true
	}))
	.pipe(gulp.dest(src.appCss.dest));
});

// Concat Libs.min.css and app.min.css in folder build/app
gulp.task('concatCss', ['concatLibs', 'concatApp'], function () {
	return streamqueue(
		{ objectMode: true },
		gulp.src(src.buildConcat.files)
	)
	.pipe(concats('main.min.css'))
	.pipe(size())
	.pipe(notify({
		'subtitle': 'Gulp Process',
		'message': '<%= file.relative %> Created build.min.css!',
		'sound': 'Beep',
		'onLast': true
	}))
	.pipe(gulp.dest(src.buildConcat.dest));
});