var gulp = require('gulp');
var config = require(global.configPath);


gulp.task('copy', function () {

	// html
	gulp.src(config.app + '/{,**/}*.html')
		.pipe(gulp.dest(config.build));

})