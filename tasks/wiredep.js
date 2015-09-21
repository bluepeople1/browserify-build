var gulp        = require('gulp');
var wiredep     = require('wiredep').stream;
var browserSync = require('./browserSync');
var config      = require('../config.json');

// wiredep服务注入
gulp.task('wiredep', function () {
	gulp.src(config.app + '/*.html')
		.pipe(wiredep({
	      ignorePath:  /\.\.\//
	    }))
	    .pipe(gulp.dest(config.app));
	gulp.watch("bower.json", ['wiredep'], browserSync.reload);
})

