'use strict';

var config = require('../config.json');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src([config.scripts.src, '!app/scripts/bundle.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});