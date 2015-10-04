// Delete in public all files before start gulp
var gulp = require('gulp');
var del = require('del');
var rmdir = require('rmdir');
var vinylPaths = require('vinyl-paths');

// Deleted folder public
gulp.task('del', function () {
	return gulp.src(['public/*', '!public/CNAME', '!public/.git'])
	.pipe(vinylPaths(del));
});

// Deleted Libs.min.css and app.min.css in folder public/app
// gulp.task('delmin', function (cb) {
// 	del(['public/app/*.min.css'], cb)
// })