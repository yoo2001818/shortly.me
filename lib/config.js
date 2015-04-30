var fs = require('fs');
var path = require('path');

module.exports = (function() {
  var url = path.resolve(__dirname, '..', 'config.json');
  var configFile, config;
  try {
    configFile = fs.readFileSync(url);
    config = JSON.parse(configFile);
  } catch (e) {
    console.log('Cannot read config file.');
    console.log('Please copy config.json.example to config.json and edit it properly.');
    console.log(e.message);
    process.exit(1);
  }
  return config;
})();
