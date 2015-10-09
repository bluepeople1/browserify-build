var gulp = require('gulp');  
var eslint = require('gulp-eslint');
var config = require(global.configPath);

gulp.task('lint', function() {  
  return gulp.src(config.app + '/scripts/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});