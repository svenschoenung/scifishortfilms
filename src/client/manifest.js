const manifestEntries = window.__MANIFEST__ || {};
delete window.__MANIFEST__;

export default function manifest(file) {
  if (!file) {
    return manifestEntries;
  }
  return manifestEntries[file] || file;
}
