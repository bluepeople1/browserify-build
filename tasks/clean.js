var gulp   = require('gulp');
var rimraf = require('rimraf');
var Q      = require('q');
var config = require(global.configPath);

// clean清理服务，在构建之前清空所有无关文件
gulp.task('clean', function (cb) {
<<<<<<< HEAD
    /*var deferedTmp   = Q.defer();
    var deferedBuild = Q.defer();

    rimraf('.tmp', function () {
        deferedTmp.resolve();
    });
	rimraf('build', function () {
        deferedBuild.resolve();
    });

    Q.all[deferedTmp.promise, deferedBuild.promise, function () {
        cb();
    }]*/
    rimraf('build', function () {
        cb();
    })
=======
	rimraf(config.build, function () {
        cb && cb();
    });    
>>>>>>> es6
})
