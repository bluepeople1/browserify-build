var gulp   = require('gulp');
var config = require(global.configPath);
var path   = require('path');

gulp.task('copy', function () {

	// html
	gulp.src(path.join(config.app, '/{,**/}*.html'))
		.pipe(gulp.dest(config.build));

})