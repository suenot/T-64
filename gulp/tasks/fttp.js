"use strict";
var gulp = require('gulp');
var sftp = require('gulp-sftp');

gulp.task('sftp', ['build'], function () {
	return gulp.src('public/**/*')
		.pipe(sftp({
			host: '185.5.250.59',
			user: 'frontend',
			pass: 'chebur829',
			remotePath: '/home/frontend/sites/prestapro.ru'
		}));
});