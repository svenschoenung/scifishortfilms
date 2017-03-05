const manifestEntries = {
  'fonts/futura.ttf': require('./fonts/futura.ttf'),
  'imgs/scifishortfilms.svg': require('./imgs/scifishortfilms.svg')
};

export default function manifest(file) {
  if (!file) {
    return manifestEntries;
  }
  return manifestEntries[file] || file;
}
