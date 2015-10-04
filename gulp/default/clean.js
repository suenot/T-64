// Delete in public all files before start gulp
var gulp = require('gulp');
var del = require('del');
var rmdir = require('rmdir');
var vinylPaths = require('vinyl-paths');

// Deleted folder public
gulp.task('del', function() {
	del(['public/*', '!public/CNAME', '!public/.git']);
});