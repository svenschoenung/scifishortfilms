var readJsonSync = require('./util/readJsonSync.js');
var argv = require('yargs').argv;

module.exports = readJsonSync(argv.config);