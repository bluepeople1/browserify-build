var gulp  = require('gulp');
var config = require('./config.json')
require('mount-tasks')(__dirname + '/tasks');

gulp.task('default', ['clean', 'browserify', 'sass', 'wiredep', 'serve'], function () {
	gulp.watch("bower.json", ['wiredep']);
});

gulp.task('preBuild', ['clean']);

gulp.task('build', ['preBuild', 'sass', 'usemin', 'imagemin', 'browerify']);