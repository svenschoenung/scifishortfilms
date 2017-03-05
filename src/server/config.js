var fs = require('fs');
var argv = require('yargs').argv;

console.log(argv);

var config;
try {
  config = JSON.parse(fs.readFileSync(argv.config).toString());
} catch (e) {
  config = {};
}

module.exports = config;