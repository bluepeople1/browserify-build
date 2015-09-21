var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gUtil       = require('gulp-util');

gulp.task('dev', ['clean'], function () {
    gUtil.log('start development...');
    global.isProd = false;

    runSequence(['browserify', 'sass', 'wiredep'], 'browserSync', function () {
        gUtil.log('start development...');
    })
})
