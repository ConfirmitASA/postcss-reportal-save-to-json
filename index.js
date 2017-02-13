// dependencies
var pcss = require('postcss');
var fs = require('fs');
var path = require('path');

// plugin
module.exports = pcss.plugin('reportal-save-to-json-plugin', function (options) {

  function plugin(css, result) {

    var index = path.basename(css.source.input.file);
    var directoryName = './dist';
    if (!fs.existsSync('./dist')) {
      fs.mkdirSync('./dist');
    }

    var output = path.resolve(directoryName, 'output-' + index + '.json');
    /*var output, index = 0;
    while(fs.existsSync(output = './dist/output-' + index + '.json')) {
      index ++;
    }*/

    //var output = './dist/output.json';

    var data = result.contents;
    var reportalConfig = result.reportalConfig;
    var extractedProperties = data.extractedProperties;
    var vars = data.vars;
    if (!vars || vars.length <= 0) {
      return;
    }

    Object.keys(extractedProperties).forEach(key => {
      var resolved = reportalConfig[key];
      if (resolved && /(#\w{6}|#\w{3}|rgba?\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*(,\s*(1|0(.\d+)?))?\))/.test(resolved)) {
        extractedProperties[key].resolved = resolved;
      } else {
        delete extractedProperties[key];
      }
    });


    // Write JSON string to file
    var string = JSON.stringify(data);
    if (string) {
      fs.writeFileSync(output, string);
    }

  }



  return plugin;
});
