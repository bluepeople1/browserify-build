var gulp        = require('gulp')
var browserSync = require('browser-sync').create();
var config      = require(global.configPath);
var path        = require('path');

// 服务器启动
gulp.task('browserSync', function() {
	console.log(config.app, config.build);
    browserSync.init({
        https: config.https,
        port: config.port,
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
	    server: !config.proxy && {
		    baseDir: path.join(global.isProd ? config.build : config.app),
		    open: false,
		    routes: {
		        "/bower_components": path.join(global.configPath, '../bower_components'),
		        "/node_modules": path.join(global.configPath, '../node_modules'),
		    }
		},
        // reloadDebounce: 2000
        proxy: config.proxy,
    });

    gulp.watch(config.app + '/*.html', browserSync.reload);
});

module.exports = browserSync;
