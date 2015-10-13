#!/usr/bin/env node

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
    port: 9000,
    https: false,
    browserify: {
        extensions: [".coffee", ".hbs"],
        debug: true,
        prodSourcemap: true,
        dropConsole: false,
        bundleConfigs: [{
            entries: cwd + '/app/scripts/app.js',
            dest: cwd + '/app/scripts/',
            build: cwd + '/build/scripts',
            outputName: 'bundle.js'
        }]
    },
    proxy: false,
    https: false,
    scripts: 'scripts',
    styles: 'styles',
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
    fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify({
        name: 'browserify-build',
        dependencies: {
            "babel": "^5.8.23",
            "babel-runtime": "^5.8.25",
            "bootstrap": "^3.3.5",
            "jquery": "^2.1.4"
        },
        "devDependencies": {},
    }, null, 4), 'utf-8');
    var appPromise = copy(path.join(__dirname, 'app'), path.join(cwd, 'app'));
    appPromise.then(function () {
        
        setTimeout(function () {
            console.log('please exec npm install');
            process.exit();
        }, 2000)
    })
    
} else if (args[0] === 'build') {
    task('build');
}  else if (args[0] === 'clone') {
    clone();
} else if (args[0] === '--task') {
    task(args[1]);
} else {
    console.log('comand error, do not exit browserify-build ' + args.join(' '));
    process.exit();
}

function config () {
    console.log('\n\nThis utility will walk you through creating a build.conf.json file.\n, it only cover common items.\n Press ^C at any time to quit.\n\n');

    prompts.question('please input the app folder name(default: app): ', function (expression) {
        Config.app = cwd + '/' + expression;
        prompts.question('please input the build folder name(default: build): ', function (expression) {
            Config.build = cwd + '/' + expression;

            prompts.question('please input the sever port(default: 9000): ', function (expression) {
                Config.port = parseInt(expression);
                
                prompts.question('if support https(true or false): ', function (expression) {
                    // Config.https =!!expression;
                    if (expression == 'true') {
                        Config.https = true;
                    } else if (expression == 'false') {
                        Config.https = false;
                    }

                    prompts.question('if support the browser-syne proxt (default: false): ', function (expression) {
                        if (expression == 'false') {
                            Config.proxy = false;
                        } else {
                            Config.proxy = expression;
                        }
                        fs.writeFileSync(path.join(cwd, 'build.conf.json'), JSON.stringify(Config, null, 4));
                        process.exit();
                    })
                })
            })
        })
    });
}

function clone () {
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
            } else {
                // 将当前的package.json 中 dependencies合并到工作目录中的package.json的devDependencies；
                var srcJson = require('./package.json');
                var dstJson = require(path.join(cwd, 'package.json'));
                extend(srcJson.dependencies, dstJson.devDependencies);

                fs.writeFileSync(path.join(cwd, 'package.json'), JSON.stringify(dstJson, null, 4), 'utf-8');
            }

            setTimeout(function () {
                process.exit();
            }, 5000);
        })
    })
}

function task(command) {
    var exec = child_process.exec('gulp '+ command +' --gulpfile ' + path.join(__dirname, 'gulpfile.js') + ' --config ' + cwd, {
        customFds: [0,1,2]
    }, function (error, stdout, stderr) {
        stdout && console.log('stdout: ' + stdout);
        stderr && console.log('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
          process.exit();
        }
    })
    exec.stdout.on('data', function (data) {
        var str = data.toString();
        process.stdout.write('\x1b[36m' + str + '\x1b[0m');
    })
    exec.stderr.on('data', function (data) {
        var str = data.toString();
        process.stdout.write('\x1b[31m' + str + '\x1b[0m');
    })
    process.on('exit', function () {
        exec.kill();
        process.exit();
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


