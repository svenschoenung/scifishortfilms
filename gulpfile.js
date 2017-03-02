var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jeditor = require('gulp-json-editor');
var rename = require('gulp-rename');
var merge = require('merge-stream');

var webpack = require('webpack-stream');
var webpack2 = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

var path = require('path');
var glob = require('glob');
var open = require('open');

gulp.task('dev:server', function(cb) {
  var server = nodemon({
    script: 'src/server.js',
    ext: 'js jsx json',
    watch: ['src/server.js', 'src/server', 'src/common']
  });

  var started = false;
  return server.on('start', function () {
    if (!started) {
      started = true;
      cb();
    }
  })
});

gulp.task('dev:client', function(cb) {
  var config = webpackConfig('dev');
  var compiler = webpack2(config);
  var server = new WebpackDevServer(compiler, config.devServer);
  server.listen(config.devServer.port, function() {
    cb();
  });
});

gulp.task('dev:browser', function(cb) {
  var config = webpackConfig('dev');
  open('http://localhost:' + config.devServer.port);
  cb();
});

gulp.task('dev', gulp.series(
  gulp.parallel('dev:client', 'dev:server'),
  'dev:browser'
));

gulp.task('prod:client', function() {
  var config = webpackConfig('prod');
  return gulp.src(config.entry.app)
    .pipe(webpack(config, webpack2))
    .pipe(gulp.dest(config.output.path));
});

gulp.task('prod:config', function(cb) {
  var output = webpackConfig('prod').output;
  var bundles = glob.sync(output.path + '/' +
    output.filename.replace('[hash]', '*'));
  
  if (bundles.length != 1) {
    return cb('Wrong number of bundles found: ' + bundles);
  }
 
  var configJson = gulp.src('src/server/config/config.prod.json')
    .pipe(jeditor(function(config) {
      return Object.assign(config, {
        bundle: path.basename(bundles[0])
      });
    }))
    .pipe(rename('config.json'));
  var configJs = gulp.src('src/server/config/config.prod.js')
    .pipe(rename('config.js'));

  return merge(configJson, configJs)
    .pipe(gulp.dest('dist/server/server/config'));
});

gulp.task('prod:server', function() {
  var stream = gulp.src([
    'src/server.js',
    'src/server/**',
    '!src/server/config/**',
    'src/common/**',
  ], { base: 'src' })

  return stream.pipe(gulp.dest('dist/server'));
});

gulp.task('prod', gulp.series(
  'prod:client', 
  gulp.parallel('prod:server', 'prod:config')
));

gulp.task('default', gulp.series('prod'));
