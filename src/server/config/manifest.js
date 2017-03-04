var manifestEntries;
try {
  manifestEntries = require('./manifest.json');
} catch (e) {
  manifestEntries = {}; 
}

export default function manifest(file) {
  if (!file) {
    return manifestEntries;
  }
  return manifestEntries[file] || file;
}
