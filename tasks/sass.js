'use strict';

var gulp         = require('gulp');
var sass         = require("gulp-sass");
var sourcemaps   = require('gulp-sourcemaps');
var gulpif       = require('gulp-if');
var buffer       = require('vinyl-buffer');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('./browserSync');
var handleErrors = require('./util/handlerError');
var path         = require('path');
var config       = require(global.configPath);
var minifyCss    = require('gulp-minify-css');

var createSourcemap = true;
gulp.task('sass', function () {

   gulp.src(path.join(config.app, config.styles, "{,**/}*.{scss, sass}"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({
            style: 'compressed',
            processImport: true,
        }))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .on('error', handleErrors)
        .pipe(gulpif(global.isProd, minifyCss({
            processImport: true,
        })))
        .pipe(gulpif(global.isProd, sourcemaps.write('./')))
        .pipe(gulp.dest(path.join((global.isProd ? config.build : config.app), config.styles)))
        .pipe(browserSync.stream({ once: true }));

})

gulp.watch(path.join(config.app, config.styles, "{,**/}*.{scss, sass}"), ['sass']);
