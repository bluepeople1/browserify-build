var gulp        = require('gulp')
var browserSync = require('browser-sync').create();
var Config      = require(global.configPath);
var path        = require('path');

// 服务器启动
gulp.task('browserSync', function() {
    browserSync.init({
        https: Config.https,
        port: Config.port,
        ui: {
		    port: 3000,
		    weinre: {
		        port: 3001
		    }
		},
		// reloadOnRestart: false,
		notify: true,
		browser: "google chrome",
        open: "external",
        // open: false,
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
		        "/bower_components": path.join(global.configPath, '../bower_components'),
		        // "/node_modules":  + "node_modules"
		        "/node_modules": path.join(global.configPath, '../node_modules'),
		    }
		},
        // reloadDebounce: 2000
        proxy: Config.proxy,
    });

    gulp.watch(Config.app + '/*.html', browserSync.reload);
});

module.exports = browserSync;
