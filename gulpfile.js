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
var del  = require('del');
var open = require('open');

// Hack: wait for backend express server to be
//       available again after nodemon restart
//
// Based on this gist:
// https://gist.github.com/icodeforlove/ae10b31d1a180577b815
(function () {
	var Server = require('webpack-dev-server/lib/Server');
	var	sendStats = Server.prototype._sendStats;

  function trySendingStats(self, args) {
    var req = {
      hostname: 'localhost',
      port: require('./config/server.dev.json').port,
      path: '/'
    };
    require('http')
      .get(req, function() {
        sendStats.apply(self, args);
      })
      .on('error', function() {
        console.log('failed for: localhost:' + req.port);
        setTimeout(() => trySendingStats(self, args), 50)
      });
  }

	Server.prototype._sendStats = function () {
    trySendingStats(this, arguments);
	};
})();

function env(environment) {
  process.env.NODE_ENV = environment;
}

gulp.task('dev:server', function(cb) {
  env('development');

  var config = require('./webpack/webpack.server.js');

  var server;
  webpack2(config).watch({ignored: /node_modules/}, function(err, stats) {
    if (err) {
      return cb(err);
    }
    console.log(stats.toString());

    var started = false;
    if (!server) {
      server = nodemon({
        script: 'build/server/server.js',
        args: ['--config', __dirname + '/config/server.dev.json'],
        ext: 'dummy-ext',
        watch: ['dummy-dir']
      })
      server.on('start', function () {
        if (!started) {
          started = true;
          cb();
        }
      });
    } else {
      server.restart();
    }
  });
});

gulp.task('dev:client', function(cb) {
  env('development');

  var config = require('./webpack/webpack.client.js');
  var compiler = webpack2(config);
  var server = new WebpackDevServer(compiler, config.devServer);
  server.listen(config.devServer.port, function() {
    cb();
  });
});

gulp.task('dev:browser', function(cb) {
  var config = require('./webpack/webpack.client.js');
  open('http://localhost:' + config.devServer.port);
  cb();
});

gulp.task('dev', gulp.series(
  'dev:server',
  'dev:client',
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
