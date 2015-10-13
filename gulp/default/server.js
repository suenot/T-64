'use strict';
var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var gutil = require('gulp-util');

var serverOpen = false,
	reloadBrowser = false;
if(gutil.env.open === true){
	serverOpen = true;
};
if(gutil.env.live === true){
	reloadBrowser = true;
};

gulp.task('server', function() {
	browserSync({
		server: {
			baseDir: 'public',
			routes: {
				'/bower_components': 'bower_components'
			}
		},
		notify: false,
		scrollProportionally: false,
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		},
		open: serverOpen,
		codeSync: reloadBrowser
	});
});

gulp.task('reload', function() {
	return gulp.src(
		[
			'public/**/*.html'
		]
	)
	.pipe(browserSync.reload({stream: true}));
});