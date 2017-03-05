var manifestEntries = require('./manifest.json');

export default function manifest(file) {
  if (!file) {
    return manifestEntries;
  }
  return manifestEntries[file] || file;
}
