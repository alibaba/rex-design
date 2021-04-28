const fs = require('fs');
const path = require('path');
const homedir = require('os').homedir();

let ossConfig = null;

try {
  ossConfig = JSON.parse(fs.readFileSync(path.join(homedir, '.rex-design-oss.config.json'), 'utf8'));
} catch (e) {
  console.warn('WARN [design-docs-config.js] 没有找到 ~/.rex-design-oss.config.json 配置文件');
}

if (process.env.YUQUE_TOKEN == null) {
  throw new Error('同步设计文档时需要通过 process.env.YUQUE_TOKEN 提供语雀 token');
}

module.exports = {
  namespace: 'hema-fe/rex-design',
  // 这里 token 只做测试用，实际运行脚本时可能需要替换为正确的 token
  yuqueToken: process.env.YUQUE_TOKEN,
  output: {
    // 设计文档输出目录
    docs: 'design-docs/',
    // images 的输出目录，必须以 static/ 开头
    images: 'static/design-images/',
    // 设计文档的 sidebar.js 的输出目录，注意要与 docusaurus 配置中的一致
    sidebarPath: 'design-sidebars.js',
  },

  // 是否保存语雀 api 输出的 markdown body
  outputRawMarkdown: false,

  // 是否保存语雀 api 输出的 html body
  outputRawHTML: false,

  // 是否将文档中的图片下载到本地
  saveImageToLocal: true,

  // 在 saveImageToLocal=true 的基础上，将下载到本地的图片再上传到 OSS 上
  uploadImage: {
    enabled: true,
    prefix: 'rex/design-images/',
    config: ossConfig,
    clearLocalImagesAfterUpload: true,
  },

  // 只同步指定的文档，主要用于调试
  // eslint-disable-next-line no-unused-vars
  filter(tocItem) {
    // e.g. tocItem.slug === 'wby7y0';
    return true;
  },
};
