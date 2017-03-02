var config = require('./config.dev.json');

var webpackConfig = require('../../../webpack.config.js')('dev');

module.exports = Object.assign(config, {
  bundle: webpackConfig.output.filename
});
