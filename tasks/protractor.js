'use strict';

var gulp            = require('gulp');
var protractor      = require('gulp-protractor').protractor;
var webdriver       = require('gulp-protractor').webdriver;
var webdriverUpdate = require('gulp-protractor').webdriver_update;
var handleErrors    = require('./util/handlerError');
// var config          = require('../config.json');

gulp.task('webdriver-update', webdriverUpdate);
gulp.task('webdriver', webdriver);

gulp.task('protractor', ['webdriver-update', 'webdriver'], function(cb) {

    gulp.src('test/e2e/**/*.js').pipe(protractor({
        configFile: 'test/protractor.conf.js'
    })).on('error', handleErrors).on('end', function() {
        process.exit();
        cb();
    });

});