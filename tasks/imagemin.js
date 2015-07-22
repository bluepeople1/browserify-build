var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var config   = require('../config.json');

// imagemin 图片压缩
gulp.task('imagemin', function () {
    return gulp.src(config.app + '/images/*')
        	.pipe(imagemin({
	            progressive: true,
	            svgoPlugins: [{removeViewBox: false}],
	            use: [pngquant()]
	        }))
        	.pipe(gulp.dest(config.dest + '/images'));
});
