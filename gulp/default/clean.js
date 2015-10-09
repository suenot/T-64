// Delete in public all files before start gulp
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');

// Deleted folder public
gulp.task('del', function() {
	return gulp.src(['public/*', '!public/CNAME', '!public/.git'], { read: false })
	.pipe(rimraf({ force: true }))
});