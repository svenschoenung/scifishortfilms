var readJsonSync = require('./util/readJsonSync.js');
var argv = require('yargs').argv;

var manifestEntries = readJsonSync(argv.manifest);

export default function manifest(file) {
  if (!file) {
    return manifestEntries;
  }
  return manifestEntries[file] || file;
}