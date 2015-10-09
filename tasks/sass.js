'use strict';

var gulp         = require('gulp');
var sass         = require("gulp-sass");
var sourcemaps   = require('gulp-sourcemaps');
var gulpif       = require('gulp-if');
var buffer       = require('vinyl-buffer');
var browserSync  = require('./browserSync');
var handleErrors = require('./util/handlerError');
var config       = require('../config.json');

var createSourcemap = true;
gulp.task('sass', function () {

   gulp.src(config.app + "/styles/sass/{,**/}*.{scss, sass}")
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: 'compressed',
            includePaths: [
                config.app + '/styles/sass',
                './node_modules/font-awesome/scss',
                './node_modules/nprogresss'
            ]
        }))
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.app + "/styles"))
        .pipe(browserSync.stream({ once: true }));
})

gulp.watch(config.app + '/styles/sass/*.scss', ['sass']);
