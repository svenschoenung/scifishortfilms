var fs = require('fs');

module.exports = function(file) {
  try {
    return JSON.parse(fs.readFileSync(file).toString());
  } catch (e) {
    return {};
  }
};
