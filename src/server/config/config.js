var config = require('../../../webpack.config.js')('dev');

module.exports = {
  port: 7000,
  bundle: config.output.filename
};
