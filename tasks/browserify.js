var watchify     = require('watchify');
var gulp         = require('gulp');
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var gutil        = require('gulp-util');
var sourcemaps   = require('gulp-sourcemaps');
var browserify   = require('browserify');
var uglify       = require('gulp-uglify');
var browsersync  = require('./browser-sync');
var bundleLogger = require('./util/logger');
var handleErrors = require('./util/handlerError');
var Config       = require('../config.json').browserify;
var babelify     = require('babelify');

gulp.task('browserify', function () {

  browsersync.notify('Browserify start');
  var bundleQueue = Config.bundleConfigs.length;

  var browserifyOne = function (bundleConfig) {

    var bundler = browserify({
      // Required watchify args
      cache: {},
      packageCache: {},
      fullPaths: false,
      // Specify the entry point of your app
      entries: bundleConfig.entries,
      // Enable source maps!
      debug: Config.debug,
      // Add file extentions to make optional in your requires
      extensions: Config.extensions,
      // runtime: require.resolve('regenerator/runtime')
    })

    var bundle = function () {
      // Log when bundling starts
        bundleLogger.start(bundleConfig.outputName);
        return bundler
            .transform(babelify.configure({
                ignore: /(bower_components)|(node_modules)/,
                stage: 0,
                optional: ["runtime"]
            }))
            .bundle()
            // Report compile errors
            .on('error', handleErrors)
            // Use vinyl-source-stream to make the
            // stream gulp compatible. Specifiy the
            // desired output filename here.
            .pipe(source(bundleConfig.outputName))
            // optional, remove if you don't need to buffer file contents
            .pipe(buffer())
            // optional, remove if you dont want sourcemaps
            .pipe(sourcemaps.init({loadMaps: true, debug: true}))
            // .pipe(uglify())
            // writes .map file
            .pipe(sourcemaps.write('./'))
            // Specify the output destination
            .pipe(gulp.dest(!gulp.env.production ? bundleConfig.dest : bundleConfig.build))
            .on('end', function () {
              gutil.log('Browserify end!')
            });
    }

    bundler = watchify(bundler);
    bundler.on('update', bundle);
    bundler.on('log', gutil.log);

    return bundle();
  }
  
  // Start bundling with Browserify for each bundleConfig specified
    Config.bundleConfigs.forEach(browserifyOne);
})

/*gulp.task('browserify', function(callback){

    function createBundle(b_config){

        var bundler = browserify(b_config.entry, {
            debug: true,
        });

        if( global.isWatching ){
            // console.log("Uses watchify");
            bundler = watchify(bundler);
            bundler.on('update', bundle);
        }

        bundler.transform(to5);

        var reportFinsihed = function(){
            bundleLogger.end(b_config.outputName);


            if( bundleQueueLen ){
                bundleQueueLen --;

                if( bundleQueueLen === 0 ){
                    callback();
                }
            }
        };

        function bundle(){
            // Create a logger when it starts logging
            bundleLogger.start(b_config.outputName);

            return bundler.bundle()
                    .on('error', handleErrors)
                    .pipe(source(b_config.outputName))
                    .pipe(gulp.dest(b_config.dest))
                    .on('end', reportFinsihed);
        }

        bundle();
    }

    var bundleQueue = config.bundleConfigs;
    var bundleQueueLen = bundleQueue.length;
    bundleQueue.forEach(createBundle);

});*/
