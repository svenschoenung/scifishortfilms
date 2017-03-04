var webpack2 = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');

var port = 8000;
var entry = './src/client.jsx';
var dist = 'dist/client';

var envConfig = {
  dev: {
    entry: [
      'webpack-dev-server/client?http://localhost:' + port + '/',
      'webpack/hot/dev-server',
      entry
    ],
    bundle: 'app.js',
    filename: '[name].[ext]',
    publicPath: 'http://localhost:' + port + '/'
  },
  prod: {
    entry: [entry],
    bundle: 'app_[hash].js',
    filename: '[name]_[hash].[ext]',
    publicPath: 'http://scifishortfilms.com/'
  }
}

module.exports = function(env) {
  var config = {
    entry: {
      app: envConfig[env].entry,
    },
    output: {
      path: __dirname + '/' + dist,
      filename: envConfig[env].bundle,
      publicPath: envConfig[env].publicPath
    },
    plugins: [
      new webpack2.HotModuleReplacementPlugin(),
      new ManifestPlugin()
    ],
    module: {
      loaders: [{
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets=es2015&presets=react&cacheDirectory=.cache',
      }, {
        test: /fonts.*\.(eot|svg|ttf|woff|woff2)$/i,
        loader: 'file-loader?name=fonts/' + envConfig[env].filename,
      }, {
        test: /imgs.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
         'file-loader?name=imgs/' + envConfig[env].filename,
         'image-webpack-loader'
       ]
      }]
    },
    devServer: {
      inline: true,
      compress: false, 
      port: port,
      publicPath: envConfig[env].publicPath,
      contentBase: dist,
      hot: true,
      proxy: {
        '!**/*.(js|css|eot|svg|ttf|woff|woff2)': 'http://localhost:7000/'
      },
      open: true
    }
  };

  return config;
};
