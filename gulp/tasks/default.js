"use strict";
var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

gulp.task('main', function(cb) {
	runSequence('del',
				'stylus',
				'app',
				'jade',
					['images',
					'font',
					'_images',
					'webp',
					'index',
					'doc'
					], cb);
});

gulp.task('build', function(cb) {
	runSequence('delbuld',
				'libs',
					['imagemin',
					'copy-img',
					'copy-font',
					'jadeBuild',
					'imageminWebpBuild'
					],
					'minify-html',
					'delmin',
					"serverbuild", cb);
});

gulp.task('libs', function(cb) {
	runSequence('concatCss', 'minjs', cb);
});

gulp.task('default', function(cb) {
	runSequence('main', 'watch', 'server', cb);
});