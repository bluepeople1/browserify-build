'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gUtil       = require('gulp-util');
// var config      = require('./config.json');
var fs          = require('fs');
var path        = require('path');
var configPath  = process.argv.splice(6)[0] || __dirname;
configPath      = path.join(configPath, 'build.conf.json');
var config      = require(configPath);
global.configPath = configPath;


require('run-sequence').use(gulp);

// loading all tasks;
require('mount-tasks')(__dirname + '/tasks');


gulp.task('dev', ['clean'], function () {
    
    global.isProd = false;

    runSequence(['browserify', 'sass'], 'browserSync')
})


gulp.task('default', ['dev']);

gulp.task('build', ['clean'], function () {
    global.isProd = true;
    runSequence(['sass'], 'usemin');
})




