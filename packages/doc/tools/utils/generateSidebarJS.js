const { formatJavaScript } = require('./formatters');
const { buildTree, isLeafNode } = require('ali-react-table');

/**
 * 根据语雀知识库的 toc 生成 sidebars.json
 * */
module.exports = function generateSidebarJS(tocItems, config) {
  const tocItemTree = buildTree('uuid', 'parent_uuid', tocItems);
  const sidebarJson = { docs: [] };

  dfs(tocItemTree, sidebarJson.docs);

  return formatJavaScript(`\
  // 这个文件是通过 sync-design-docs.js 脚本自动生成的，请不要手动修改
  module.exports = ${JSON.stringify(sidebarJson)};
  `);

  function dfs(nodes, array) {
    for (const node of nodes) {
      if (config.filter != null && !config.filter(node)) {
        continue;
      }

      if (isLeafNode(node)) {
        if (node.type === 'DOC') {
          // 「文档」和「目录」是严格区分开的，需要让设计师遵守这个约定
          array.push(node.slug);
        }
      } else {
        const category = {
          type: 'category',
          label: node.title,
          collapsed: false,
          items: [],
        };
        array.push(category);
        dfs(node.children, category.items);
      }
    }
  }
};
