const axios = require('axios');
const path = require('path');
const deploy = require('aliyun-oss-deploy');
const fs = require('fs');
const config = require('./design-docs-config');
const processYuqueMarkdown = require('./utils/processYuqueMarkdown');
const generateSidebarJS = require('./utils/generateSidebarJS');

const baseDir = path.resolve(__dirname, '..');

if (process.cwd() !== baseDir) {
  throw new Error('sync-design-docs 脚本的执行目录必须为:\n' + baseDir + '\n\n');
}

const docsOutputDir = path.join(baseDir, config.output.docs);
const imagesOutputDir = path.join(baseDir, config.output.images);

fs.rmSync(docsOutputDir, { recursive: true, force: true });
fs.rmSync(imagesOutputDir, { recursive: true, force: true });
fs.mkdirSync(docsOutputDir, { recursive: true });
fs.mkdirSync(imagesOutputDir, { recursive: true });

if (config.uploadImage.enabled) {
  if (!config.saveImageToLocal) {
    throw new Error('uploadImage.enabled 开启之前，必须设置 saveImageToLocal=true');
  }
  if (config.uploadImage.config == null) {
    throw new Error('uploadImage.enabled 开启的情况下，uploadImage.config 不能为空');
  }
}

const axiosInst = axios.create({
  headers: { 'X-Auth-Token': config.yuqueToken },
  baseURL: 'https://www.yuque.com/api/v2',
});

async function main() {
  console.log(`getting repo toc items of ${config.namespace}`);

  const itemsRes = await axiosInst.get(`/repos/${config.namespace}/toc`);
  const tocItems = itemsRes.data.data;
  let needSetSidebarSlug = true;

  for (let tocItemIndex = 0; tocItemIndex < tocItems.length; tocItemIndex++) {
    const tocItem = tocItems[tocItemIndex];
    if (tocItem.type !== 'DOC') {
      continue;
    }

    if (config.filter != null && !config.filter(tocItem)) {
      continue;
    }

    console.log(`getting doc ${tocItem.url}`);
    const docRes = await axiosInst.get(`/repos/${config.namespace}/docs/${tocItem.url}`);
    const { title, slug, body, body_html } = docRes.data.data;

    const markdownContent = await processYuqueMarkdown(
      { title, slug, body, html: body_html },
      {
        imagesOutputDir,
        needSetSidebarSlug,
      },
      config,
    );
    needSetSidebarSlug = false;

    if (config.outputRawMarkdown) {
      fs.writeFileSync(path.join(docsOutputDir, `${slug}.raw.mdx`), body, 'utf8');
    }
    if (config.outputRawHTML) {
      fs.writeFileSync(path.join(docsOutputDir, `${slug}.raw.html`), body_html, 'utf8');
    }
    fs.writeFileSync(path.join(docsOutputDir, `${slug}.mdx`), markdownContent, 'utf8');
  }

  // 将图片文件夹上传到 OSS
  if (config.uploadImage.enabled) {
    console.log(`upload image to OSS...`);
    await deploy(config.output.images, config.uploadImage.config, config.uploadImage.prefix);

    if (config.uploadImage.clearLocalImagesAfterUpload) {
      fs.rmSync(config.output.images, { recursive: true, force: true });
    }
  }

  fs.writeFileSync(path.join(baseDir, config.output.sidebarPath), generateSidebarJS(tocItems, config), 'utf8');
}

main();
