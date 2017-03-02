var webpack2 = require('webpack');

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
    filename: 'app.js',
    publicPath: 'http://localhost:' + port + '/'
  },
  prod: {
    entry: [entry],
    filename: 'app_[hash].js',
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
      filename: envConfig[env].filename,
      publicPath: envConfig[env].publicPath
    },
    plugins: [
      new webpack2.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [{
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets=es2015&presets=react&cacheDirectory=.cache',
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
        '!**/*.(js|css)': 'http://localhost:7000/'
      },
      open: true
    }
  };

  return config;
};
