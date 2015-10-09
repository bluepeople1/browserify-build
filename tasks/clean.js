var gulp   = require('gulp');
var rimraf = require('rimraf');
var Q      = require('q');
var config = require(global.configPath);

// clean清理服务，在构建之前清空所有无关文件
gulp.task('clean', function (cb) {
	rimraf(config.build, function () {
        cb && cb();
    });    
})
