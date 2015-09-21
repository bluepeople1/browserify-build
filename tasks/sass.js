var gulp         = require('gulp');
var sass         = require("gulp-sass");
var sourcemaps   = require('gulp-sourcemaps');
var gulpif       = require('gulp-if');
var browserSync  = require('./browserSync');
var handleErrors = require('./util/handlerError');
var config       = require('../config.json');

gulp.task('sass', function () {

   gulp.src(config.app + "/styles/sass/{,**/}*.{scss, sass}")
    	.pipe(gulpif(global.isProd, sourcemaps.init()))
        .pipe(sass())
        .on('error', handleErrors)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.app + "/styles"))
        .pipe(browserSync.stream({ once: true }));

    gulp.watch(config.app + '/styles/sass/*.scss', ['sass'])
})
