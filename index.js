// dependencies
var pcss = require('postcss');
var fs = require('fs');
var path = require('path');

// plugin
module.exports = pcss.plugin('reportal-save-to-json-plugin', function (options) {

  function plugin(css, result) {

    var index = path.basename(css.source.input.file);
    var output = output = './dist/output-' + index + '.json';
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

    /*var content, string;
    if (fs.existsSync(output)) {
      content = fs.readFileSync(output, 'utf8');
    }

    if (content) {
      string = JSON.stringify(JSON.parse(content).push(data));
    } else {
      string = JSON.stringify([data]);
    }

    fs.writeFileSync(output, string);*/


    // Write JSON string to file
    var string = JSON.stringify(data);
    //console.log(string.length)
    if (string) {
      fs.writeFileSync(output, string);
    }

    /*var vars = [];

    css.walkRules(':root', rule => {
      rule.walkDecls(function (decl, i) {
        if (/^#[a-z\d][a-z\d][a-z\d][a-z\d][a-z\d][a-z\d]$/i.test(decl.value)) {
          vars.push({
            name: decl.prop,
            value: decl.value
          });
        }
      });
    });

    css.walkRules(function (rule) {
      var selector = rule.selector;

      rule.walkDecls(function (decl, i) {

      });
    });
*/
/*
    css.walkDecls(function (decl) {

    });


    // file path to write results
    var output = './dist/output.json';

    var data = result.contents;

    // Write JSON string to file
    var string = JSON.stringify(data).replace(/},/g, '},\r\n').replace(/{/g, '{\r\n').replace(/],/g, '],\r\n').replace(/}/g, '\r\n}\r\n')//.replace(/ /g, '');
    fs.writeFileSync(output, string);*/
  }



  return plugin;
});
