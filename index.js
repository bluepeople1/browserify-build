'use strict';
var util = require('util');
var fs   = require('fs');
var path = require('path');
var readline = require('readline');
var child_process = require('child_process');

var prompts = readline.createInterface(process.stdin, process.stdout);
process.stdin.setEncoding("utf8")

var args = process.argv.splice(2);
var _dirpath = __dirname;

console.log(process.argv);

function trim (str) {
    return str.replace(/\s*/g, '');
}
var Config = {};

// init 参数, 构建build.conf.json
if (args[0] == 'init') {
    var times = 0;
    console.log('\n\nThis utility will walk you through creating a build.conf.json file.\n, it only cover common items.\n Press ^C at any time to quit.\n\n');

    Config.browserify = {
        extensions: [".coffee", ".hbs"],
        debug: true,
        bundleConfigs: [{
            entries: Config.app + '/scripts/app.js',
            dest: Config.app + '/scripts/',
            outputName: 'bundle.js'
        }]
    }

    prompts.question('please input the app folder name: ', function (expression) {
        Config.app = expression;
        prompts.question('please input the build folder name: ', function (expression) {
            Config.build = expression;

            prompts.question('please input the sever port: ', function (expression) {
                Config.port = parseInt(expression);
                fs.writeFileSync(path.join(_dirpath, 'build.conf.json'), JSON.stringify(Config, null, 4));
                process.exit();
            })
        })
    });
} else if (args.length == 0 || args[0] === 'start') {
    child_process.exec('gulp ')
}


