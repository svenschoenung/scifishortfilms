const webpack2 = require('webpack');

module.exports = function() {
  if (process.env.NODE_ENV === 'production') {
    var fileLoaderName = '[name]_[hash].[ext]';
    var imageLoaderOptions = '?optipng.optimizationLevel=4';
    var cssLoaderOptions = '&minimize=true&sourceMap=true';
  }
  if (process.env.NODE_ENV === 'development') {
    var fileLoaderName = '[name].[ext]';
    var imageLoaderOptions = '?optipng.optimizationLevel=0';
    var cssLoaderOptions = '';
  }

  return {
    entry: { },
    output: { },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loaders: [
            'babel-loader?presets=es2015&presets=react&cacheDirectory=.cache'
          ]
        }, {
          test: /\/fonts\/.*\.(eot|svg|ttf|woff|woff2)$/i,
          exclude: /(node_modules|bower_components)/,
          loaders: [
            'file-loader?name=fonts/' + fileLoaderName,
          ]
        }, {
          test: /\/imgs\/.*\.(gif|png|jpe?g|svg)$/i,
          exclude: /(node_modules|bower_components)/,
          loaders: [ 
            'file-loader?name=imgs/' + fileLoaderName, 
            'image-webpack-loader' + imageLoaderOptions
          ]
        }, {
          test: /\.css$/,
          exclude: /(node_modules|bower_components)/,
          loaders: [
            'isomorphic-style-loader',
            'css-loader?modules=true' + cssLoaderOptions,
          ]
        }
      ]
    }
  }
};