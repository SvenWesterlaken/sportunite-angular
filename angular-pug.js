const fs = require('fs');

const commonCliConfig = 'node_modules/@angular/cli/models/webpack-configs/common.js';
const pug_rule = `\n{ test: /.pug$/, loader: [ 'html-loader', { loader: "pug-html-loader", options: { doctype: 'html', pretty: true } } ], },`;

fs.readFile(commonCliConfig, (err, data) => {
  if (err) { throw err; }

  const configText = data.toString();

  if (configText.indexOf(pug_rule) > -1) {
    return;
  }

  console.log('-- Inserting .pug webpack rule -- ');

  const position = configText.indexOf('rules: [') + 8;
  const output = [configText.slice(0, position), pug_rule, configText.slice(position)].join('');

  const file = fs.openSync(commonCliConfig, 'r+');
  fs.writeFile(file, output);
  fs.close(file);
});
