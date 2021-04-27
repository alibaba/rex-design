const klaw = require('klaw');
const path = require('path');

module.exports = function (context, { srcDir }) {
  return {
    name: 'components-source-location',

    async loadContent() {
      const files = [];
      for await (const file of klaw(srcDir)) {
        if (file.stats.isFile()) {
          files.push(path.relative(srcDir, file.path));
        }
      }
      return { root: srcDir, files };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
