'use strict';
var isWin = /^win/.test(process.platform);
var gulp = require('gulp');
var filter = require('gulp-filter');


if (!isWin) {
	var svgSprite = require('gulp-svg-sprites');
	var svg2png = require('gulp-svg2png');
	gulp.task('svg-symbols', function () {
		return gulp.src('assets/img/svg/*.svg')
		.pipe(svgSprite({
			svg: {
				sprite: 'sprite.svg'
			},
			preview: {
				sprite: 'index.html'
			},
			mode: 'symbols'
		}))
		.pipe(gulp.dest('assets/img/svg-symbols'));
	});
	gulp.task('svg-sprite', function () {
		return gulp.src('assets/img/svg/*.svg')
		.pipe(svgSprite())
		.pipe(gulp.dest('assets/img/svg-sprite'))
		.pipe(filter('**/*.svg'))
		.pipe(svg2png())
		.pipe(gulp.dest('assets/img/svg-sprite'));
	});
	gulp.task('svg', ['svg-symbols', 'svg-sprite']);
};