'use strict';

require('require-dir')('./gulp/tasks', {recurse: true});
var runSequence = require('run-sequence');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');