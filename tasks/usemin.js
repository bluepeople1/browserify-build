var gulp       = require('gulp');
var usemin     = require('gulp-usemin');
var uglify     = require('gulp-uglify');
var foreach    = require('gulp-foreach');
var minifyHtml = require('gulp-minify-html');
var minifyCss  = require('gulp-minify-css');
var rev        = require('gulp-rev');
var config     = require('../config.json');
/*
 * foreach is because usemin 0.3.11 won't manipulate
 * multiple files as an array.
 */
gulp.task('usemin', function() {
  return gulp.src(config.app + '/*.html')
    .pipe(foreach(function(stream, file) {
      return stream
        .pipe(usemin({
          css: [ minifyCss(), 'concat' ],
          // html: [ minifyHtml({ empty: true }) ],
          js: [ uglify(), rev() ],
          inlinejs: [ uglify(),rev() ],
          inlinecss: [ minifyCss(), 'concat' ]
        }))
        .pipe(gulp.dest('build/'));
    }));
});