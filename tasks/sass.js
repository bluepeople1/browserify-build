var gulp         = require('gulp');
var sass         = require("gulp-sass");
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('./browser-sync');
var handleErrors = require('./util/handlerError');
var config       = require('../config.json');

gulp.task('sass', function () {

   gulp.src(config.app + "/styles/sass/{,**/}*.{scss, sass}")
    	.pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.app + "/styles"))
        .pipe(browserSync.stream());

    gulp.watch(config.app + '/styles/sass/{,**/}*.{scss, sass}', ['sass'], function () {
        console.log(arguments);
    })
})
