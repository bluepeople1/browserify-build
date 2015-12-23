'use strict';

var gulp          = require('gulp');
var runSequence   = require('run-sequence');
var gUtil         = require('gulp-util');
var fs            = require('fs');
var path          = require('path');
var configPath    = process.argv.splice(6)[0] || __dirname;
configPath        = path.join(configPath, 'build.conf.json');
var config        = require(configPath);
global.configPath = configPath;
global.PWD        = process.env.PWD;
config.app        = path.join(global.PWD, config.app);
config.build      = path.join(global.PWD, config.build);

require('run-sequence').use(gulp);

// loading all tasks;
require('mount-tasks')(__dirname + '/tasks');

gulp.task('dev', function () {
    
    global.isProd = false;
    runSequence(['browserify', 'sass'], 'browserSync')
})

gulp.task('default', ['dev']);

gulp.task('build', ['clean'], function () {
    global.isProd = true;
    runSequence(['browserify', 'sass', 'copy', 'browserSync', 'imagemin'], function () {
    	// process.exit();
    });
})




