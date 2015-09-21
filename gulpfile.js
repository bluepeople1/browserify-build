'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gUtil       = require('gulp-util');
var config      = require('./config.json');
var fs          = require('fs');
var path        = require('path');

require('run-sequence').use(gulp);

// loading all tasks;
require('mount-tasks')(__dirname + '/tasks');


gulp.task('dev', ['clean'], function () {
    
    global.isProd = false;

    runSequence(['browserify', 'sass', 'wiredep'], 'browserSync', function () {
        gUtil.log('start development...');
    })
})


gulp.task('default', ['dev']);

gulp.task('build', ['clean'], function () {
    global.isProd = true;

    runSequence(['browserify', 'sass', 'imagemin'], 'usemin', function () {
        gUtil.log('finish build...');
        // process.exit();
    })
})




