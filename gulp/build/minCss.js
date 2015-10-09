'use strict';
var gulp = require('gulp');
var streamqueue = require('streamqueue');
var postcss = require('gulp-postcss');
var uncss = require('gulp-uncss');
var src = {};
var config = require('../utils/config');
var each = require('async-each-series');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var concats = require('gulp-concat');

var postcssOptions = [
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

gulp.task('minCss', function(done) {
	each(config.bundles, function(bundle, next) {
		streamqueue(
			{objectMode: true},
			gulp.src(bundle.css)
		)
		.pipe(gulpif(bundle.uncss,
			uncss({
				html: bundle.pages
			})
		))
		.pipe(concats(bundle.name + '.min.css'))
		.pipe(postcss(postcssOptions))
		.pipe(minifyCss())
		.pipe(gulp.dest(bundle.buildTo))
		.on('finish', next);
	}, done());
});