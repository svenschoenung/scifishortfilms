var webpack2 = require('webpack');
var fs = require('fs');

var webpackConfig = require('./webpack.js')();

webpackConfig.entry.app = './src/server.js'
webpackConfig.output.filename = 'server.js';
webpackConfig.target = 'node';
webpackConfig.node = {
  console: true,
  global: true,
  process: true,
  Buffer: true,
  __filename: true ,
  __dirname: true,
  setImmediate: true
};
webpackConfig.externals = 
  fs.readdirSync('node_modules')
    .reduce(function(externals, mod) {
      externals[mod] = 'commonjs ' + mod;
      return externals;
    }, {});

if (process.env.NODE_ENV == 'production') {
  webpackConfig.output.publicPath = 'http://scifishortfilms.com/';
  webpackConfig.output.path = __dirname + '/../dist/server';
}

if (process.env.NODE_ENV == 'development') {
  var clientConfig = require('../config/client.dev.json');

  webpackConfig.output.publicPath = 'http://localhost:' + clientConfig.port + '/';
  webpackConfig.output.path = __dirname + '/../build/server';
}

module.exports = webpackConfig;