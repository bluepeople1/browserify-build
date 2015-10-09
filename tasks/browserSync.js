var gulp        = require('gulp')
var browserSync = require('browser-sync').create();
var Config      = require(global.configPath);

// 服务器启动
gulp.task('browserSync', function() {
    browserSync.init([Config.app + '/{**/,}*.css', Config.app + '/{**/,}bundle.js'], {
        https: Config.https,
        port: Config.port,
        ui: {
		    port: 3000,
		    weinre: {
		        port: 3001
		    }
		},
		reloadOnRestart: false,
		notify: false,
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
		        "/bower_components": "bower_components",
		        "/node_modules": "node_modules",
		    }
		},
        reloadDebounce: 2000
    });
});

module.exports = browserSync;
