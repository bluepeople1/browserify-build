var gulp       = require('gulp');
var usemin     = require('gulp-usemin');
var uglify     = require('gulp-uglify');
var foreach    = require('gulp-foreach');
var minifyHtml = require('gulp-minify-html');
var minifyCss  = require('gulp-minify-css');
var rev        = require('gulp-rev');
var cssImport    = require('gulp-cssimport');
var config     = require(global.configPath);

/*
 * foreach is because usemin 0.3.11 won't manipulate
 * multiple files as an array.
 */
 
gulp.task('usemin', function() {
  return gulp.src(config.app + '/*.html')
    .pipe(foreach(function(stream, file) {
      return stream
        .pipe(usemin({
          html: [minifyHtml({ empty: true })],
          js: [rev()],
          css: [minifyCss()]
        }))
        .pipe(gulp.dest(config.build));
    }));
});