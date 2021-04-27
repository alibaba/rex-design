const prettier = require('prettier');

const prettierConfig = prettier.resolveConfig.sync(__filename);

function formatMarkdown(content) {
  return prettier.format(content, { ...prettierConfig, parser: 'mdx' });
}

function formatJavaScript(content) {
  return prettier.format(content, { ...prettierConfig, parser: 'babel' });
}

module.exports = {
  formatMarkdown,
  formatJavaScript,
};
