var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var shell = require('gulp-shell');
var zip = require('gulp-zip');

var webpack = require('webpack-stream');
var webpack2 = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

var del  = require('del');
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

gulp.task('prod:clean', function() {
  return del(['dist/']);
});

gulp.task('prod:client', function() {
  var config = webpackConfig('prod');
  return gulp.src(config.entry.app)
    .pipe(webpack(config, webpack2))
    .pipe(gulp.dest(config.output.path));
});

gulp.task('prod:manifest', function() {
  return gulp.src('dist/client/manifest.json')
    .pipe(gulp.dest('dist/server/server/'));
});

gulp.task('prod:config', function() {
  var stream = gulp.src([
    'src/server/config/*',
    '!src/server/config/*.dev.*'
  ]);

  return stream
    .pipe(gulpif('**/config.js', replace('config.dev', 'config')))
    .pipe(gulpif('**/config.prod.json', rename('config.json')))
    .pipe(gulp.dest('dist/server/server/config'));
});

gulp.task('prod:deps', shell.task([
  'mkdir -p dist/server/node_modules',
  'cp package.json dist/server/node_modules',
  'npm install --prod --prefix dist/server/node_modules'
]));

gulp.task('prod:server', function() {
  var stream = gulp.src([
    'src/server.js',
    'src/server/**',
    '!src/server/config/**',
    'src/common/**',
  ], { base: 'src' })

  return stream.pipe(gulp.dest('dist/server'));
});

gulp.task('prod:zip-client', function() {
  return gulp.src('dist/client/**', { base:'dist/' })
    .pipe(zip('client.zip'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('prod:zip-server', function() {
  return gulp.src('dist/server/**', { base: 'dist/' })
    .pipe(zip('server.zip'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('prod', gulp.series(
  'prod:clean', 
  'prod:client', 
  gulp.parallel('prod:server', 'prod:deps', 'prod:config', 'prod:manifest'),
  gulp.parallel('prod:zip-client', 'prod:zip-server')
));

gulp.task('default', gulp.series('prod'));
