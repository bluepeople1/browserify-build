'use strict';
var util = require('util');
var fs   = require('fs');
var path = require('path');
var readline = require('readline');
var child_process = require('child_process');
var Q = require('q');

var prompts = readline.createInterface(process.stdin, process.stdout);
process.stdin.setEncoding("utf8")

var args = process.argv.splice(2);
var cwd  = process.cwd();
var _dirpath = __dirname;


var Config = {
    app: cwd + '/app',
    build: cwd + 'build',
    port: 8080,
    https: false,
    browserify: {
        extensions: [".coffee", ".hbs"],
        debug: true,
        bundleConfigs: [{
            entries: cwd + '/app/scripts/app.js',
            dest: cwd + '/app/scripts/',
            outputName: 'bundle.js'
        }]
    }
};

// init 参数, 构建build.conf.json
if (args[0] == 'config' || args.length === 0) {
    var exists = fs.existsSync(path.join(cwd + 'build.conf.json'));
    if (!exists) {
        config();
    } else {    
        task('dev');
    }
    
} else if (args[0] === 'start') {
    task('dev')
} else if (args[0] === 'init') {
    init();
} else if (args[0] === 'build') {
    task('build');
}

function config () {
    console.log('\n\nThis utility will walk you through creating a build.conf.json file.\n, it only cover common items.\n Press ^C at any time to quit.\n\n');

    prompts.question('please input the app folder name: ', function (expression) {
        Config.app = cwd + '/' + expression;
        prompts.question('please input the build folder name: ', function (expression) {
            Config.build = cwd + '/' + expression;

            prompts.question('please input the sever port: ', function (expression) {
                Config.port = parseInt(expression);
                console.log('write build.conf.js');
                fs.writeFileSync(path.join(cwd, 'build.conf.json'), JSON.stringify(Config, null, 4));
                process.exit();
            })
        })
    });
}

function init () {
    var appPromise = copy(path.join(__dirname, 'app'), path.join(cwd, 'app'));
    var taskPromise = copy(path.join(__dirname, 'tasks'), path.join(cwd, 'tasks'));
    var gulpPromise = copy(path.join(__dirname, 'gulpfile.js'), path.join(cwd, 'gulpfile.js'))
    fs.writeFileSync(path.join(cwd, 'build.conf.json'), JSON.stringify(Config, null, 4), 'utf-8');

    Q.all(appPromise, taskPromise, gulpPromise).then(function () {
        // 合并package.json
        fs.exists(path.join(cwd, 'package.json'), function (exists) {
            var packagePromise = Q.defer();
            if (!exists) {
                packagePromise = copy(path.join(__dirname, 'package.json'), path.join(cwd, 'package.json'))
                // process.exit();
            } else {
                // 将当前的package.json 中 dependencies合并到工作目录中的package.json的devDependencies；
                var srcJson = require('./package.json');
                var dstJson = require(path.join(cwd, 'package.json'));
                extend(srcJson.dependencies, dstJson.devDependencies);

                fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(dstJson, null, 4), 'utf-8');
                // fs.writeFileSync(path.join(cwd, 'build.conf.json'), JSON.stringify(Config, null, 4), 'utf-8');
                // process.exit();
            }

            setTimeout(function () {
                process.exit();
            }, 5000);
        })
    })
}

function task(command) {
    var exec = child_process.exec('gulp '+ command +' --gulpfile ' + path.join(__dirname, 'gulpfile.js') + ' --config ' + cwd, function (error, stdout, stderr) {
        stdout && console.log('stdout: ' + stdout);
        stderr && console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
          process.exit();
        }
    })
    exec.stdout.on('data', function (data) {
        // console.log(data.toString());
        process.stdout.write(data.toString());
    })
    exec.stderr.on('data', function (data) {
        // console.error(data.toString());
        process.stdout.write(data.toString());
    })
    process.on('exit', function () {
        console.log('end!');
        exec.kill();
    })
}



function copy (src, dst) {
    var defered = Q.defer();
    var stat = fs.statSync(src);

    if (stat.isFile()) {
        copyFile(src, dst);
        defered.resolve(true)
    } else if (stat.isDirectory()) {
        copyDir(src, dst).then(function () {
            defered.resolve(true);
        }, function (err) {
            defered.reject(err);
        });
    }
    
    function copyFile (src, dst) {
        var readStream,
            writeStream;
        readStream = fs.createReadStream(src);
        writeStream = fs.createWriteStream(dst);
        readStream.pipe(writeStream);
    }

    function copyDir (src, dst) {
        // 先判断目录是否存在
        var exists = fs.existsSync(dst);
        if (!exists) {
            fs.mkdirSync(dst);
        }

        var defered = Q.defer();
        fs.readdir(src, function (err, files) {
            if (err) {
                throw err;
                defered.reject(err);
            }
            files.forEach(function(file) {
                var _src = src + '/' + file,
                    _dst = dst + '/' + file;

                var stat = fs.statSync(_src)
                if (stat.isFile()){
                    copyFile(_src, _dst);
                } else if (stat.isDirectory) {
                    copyDir(_src, _dst);
                    // 先判断目录是否存在
                }
            })
            defered.resolve(true);
        })
        return defered.promise;
    }

    return defered.promise;
}

function extend(src, dst) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) {
            dst[key] = src[key];
        }
    }
}

function trim (str) {
    return str.replace(/\s*/g, '');
}


