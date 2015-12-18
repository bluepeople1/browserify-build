var gulp     = require('gulp');
var path     = require('path');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var config   = require(global.configPath);

// imagemin 图片压缩
gulp.task('imagemin', function () {
    return gulp.src(path.join(config.app, config.images, '*'))
        	.pipe(imagemin({
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()]
	        }))
        	.pipe(gulp.dest(path.join(config.build, config.images)));
});
