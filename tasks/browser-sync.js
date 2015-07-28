var gulp        = require('gulp')
var browserSync = require('browser-sync').create();
var Config      = require('../config.json');

// 服务器启动
gulp.task('serve', function() {
    browserSync.init([Config.app + '/**.*'], {
        // https: true,
        port: Config.port,
        ui: {
		    port: 8080,
		    weinre: {
		        port: 9090
		    }
		},
		reloadOnRestart: false,
		notify: true,
		browser: "google chrome",
        open: "external",
	    ghostMode: {
	        clicks: true,
	        location: true,
	        forms: true,
	        scroll: true
	    },
	    server: {
		    baseDir: Config.app,
		    open: false,
		    routes: {
		        "/bower_components": "bower_components",
		    }
		}
    });
});

module.exports = browserSync;
