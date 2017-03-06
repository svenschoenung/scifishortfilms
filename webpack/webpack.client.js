const webpack2 = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

var { webpackConfig, cssLoaderOptions } = require('./webpack.js')();

webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: /(node_modules|bower_components)/,
  loader: ExtractTextPlugin.extract({
    use: [ 'css-loader?modules=true' + cssLoaderOptions ]
  })
});

if (process.env.NODE_ENV == 'production') {
  var clientConfig = require('../config/client.prod.json');

  webpackConfig.entry.app = [
    './src/client.jsx'
  ];
  webpackConfig.output.publicPath = 'http://scifishortfilms.com/';
  webpackConfig.output.filename = 'app_[hash:10].min.js';
  webpackConfig.output.path = __dirname + '/../dist/client';
  webpackConfig.plugins.push(new ExtractTextPlugin("app_[contenthash:10].min.css"));
  webpackConfig.plugins.push(new ManifestPlugin());
}

if (process.env.NODE_ENV == 'development') {
  var clientConfig = require('../config/client.dev.json');
  var serverConfig = require('../config/server.dev.json');

  webpackConfig.entry.app = [
    'webpack-dev-server/client?http://localhost:' + clientConfig.port + '/',
    'webpack/hot/dev-server',
    './src/client.jsx'
  ];
  webpackConfig.output.publicPath = 'http://localhost:' + clientConfig.port + '/';
  webpackConfig.output.filename = 'app.js';
  webpackConfig.output.path = __dirname + '/../build/client';
  webpackConfig.plugins.push(new webpack2.HotModuleReplacementPlugin());
  webpackConfig.plugins.push(new ExtractTextPlugin("app.css"));
  webpackConfig.devServer = {
    inline: true,
    compress: false, 
    hot: true,
    port: clientConfig.port,
    publicPath: webpackConfig.output.publicPath,
    contentBase: __dirname + '/../build/client',
    proxy: {
      '!**/*.(js|css|eot|svg|ttf|woff|woff2)':
        'http://localhost:' + serverConfig.port + '/'
    }
  };

}

module.exports = webpackConfig;