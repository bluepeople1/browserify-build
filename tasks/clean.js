var gulp   = require('gulp');
var rimraf = require('rimraf');
var Q      = require('q');

// clean清理服务，在构建之前清空所有无关文件
gulp.task('clean', function (cb) {
    var deferedTmp   = Q.defer();
    var deferedBuild = Q.defer();

    rimraf('.tmp', function () {
        deferedTmp.resolve();
    });
	rimraf('build', function () {
        deferedBuild.resolve();
    });

    Q.all[deferedTmp.promise, deferedBuild.promise, function () {
        cb && cb();
    }]
})
