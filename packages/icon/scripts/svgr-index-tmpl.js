const path = require('path');

function indexTemplate(files) {
  const exportEntries = files.map((file) => {
    const basename = path.basename(file, path.extname(file));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as ${
      exportName.startsWith('Svg') ? exportName : `Svg${exportName}`
    } } from './${basename}';`;
  });
  return exportEntries.join('\n');
}

module.exports = indexTemplate;
