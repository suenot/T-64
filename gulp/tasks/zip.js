// var gulp = require('gulp');
// var tar = require('gulp-tar');
// var gzip = require('gulp-gzip');
// var dateFormat = require('dateformat');


// gulp.task('zip', function() {
// 	return gulp.src('./public')
// 		// .pipe(tar(revision.short() + '-build.tar'))
// 		.pipe(tar(dateFormat(new Date(), "yyyymmdd-HHMM") + '-build.tar'))
// 		.pipe(gzip())
// 		.pipe(gulp.dest('./'))
// });