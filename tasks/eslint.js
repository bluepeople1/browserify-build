var gulp     = require('gulp');
var eslint   = require('gulp-eslint');
var path     = require('path');
var config   = require(global.configPath);
gulp.task('eslint', function() {
  return gulp.src(path.join(config.app, config.scripts, '**/*.js'))
    .pipe(eslint())
    .pipe(eslint.format())
});