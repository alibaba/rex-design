const axios = require('axios');
const { Buffer } = require('buffer');
const crypto = require('crypto');
const dayjs = require('dayjs');
const cheerio = require('cheerio');
const visit = require('unist-util-visit');
const path = require('path');
const fs = require('fs');
const remark = require('remark');
const frontmatter = require('remark-frontmatter');
const { formatMarkdown } = require('./formatters');

/** 将指定链接的图片保存到指定的目录，返回保存的文件名，文件名由图片的哈希值决定。 */
async function saveRemoteFile(url, localDirectory) {
  const imageResponse = await axios.get(url, {
    responseType: 'stream',
  });

  const contentType = imageResponse.headers['content-type'];
  // TODO 优化检测图片后缀的方式
  const fileExt = contentType.includes('jpg') || contentType.includes('jpeg') ? '.jpg' : '.png';

  const chunks = [];
  for await (const chunk of imageResponse.data) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);
  const hashPrefix = crypto.createHash('sha256').update(buffer).digest('hex').slice(0, 8);
  const filename = `${hashPrefix}${fileExt}`;

  fs.mkdirSync(localDirectory, { recursive: true });
  fs.writeFileSync(path.join(localDirectory, filename), buffer);

  return filename;
}

function generateYamlFrontmatter(entries) {
  const lines = ['---'];
  for (const [key, value] of entries) {
    if (value != null) {
      lines.push(`${key}: ${value.replace(/[[\]{}]/g, '')}`);
    }
  }
  lines.push('---');
  // 添加一个额外的空行
  lines.push('\n');

  return lines.join('\n');
}

// 替换文件中所有的图片链接
function replaceImageUrls(markdownContent, imageMap) {
  return remark().use(frontmatter, ['yaml', 'toml']).use(replaceImageUrl).processSync(markdownContent).toString();

  function replaceImageUrl() {
    return (tree) => {
      visit(tree, 'image', (node) => {
        const item = imageMap.get(node.url);
        if (item) {
          node.url = item.url;
          node.alt += '#' + item.meta;
        }
      });
    };
  }
}

function cleanAsterisks(markdownContent) {
  return remark().use(frontmatter, ['yaml', 'toml']).use(clean).processSync(markdownContent).toString();

  function clean() {
    return (tree) => {
      visit(tree, 'text', (node, nodeIndex, parent) => {
        // 移除两个连续的 bold 的边界
        node.value = node.value.replace(/\*{4}/g, '');

        const boldReg = /\*\*(?<content>[^*\n]+)\*\*/g;

        if (parent.type === 'paragraph') {
          const text = node.value;
          const matches = Array.from(text.matchAll(boldReg));
          if (matches.length > 0) {
            const result = [];

            let lastCharIndex = 0;
            for (const {
              index,
              groups: { content },
            } of matches) {
              if (index > lastCharIndex) {
                result.push({
                  type: 'text',
                  // 在后面插入一个空格作为加粗文本的分隔符
                  value: text.substring(lastCharIndex, index) + ' ',
                });
              }
              result.push({
                type: 'strong',
                children: [{ type: 'text', value: content }],
              });
              const doubleAsteriskLength = 2;
              lastCharIndex = index + doubleAsteriskLength + content.length + doubleAsteriskLength;
            }
            if (lastCharIndex < text.length) {
              result.push({
                type: 'text',
                // 在前面插入一个空格作为加粗文本的分隔符
                value: ' ' + text.substring(lastCharIndex),
              });
            }

            parent.children.splice(nodeIndex, 1, ...result);
            return nodeIndex + result.length;
          }
        }
      });
    };
  }
}

// 从 markdown 文件中找到所有的图片链接
function retrieveImageUrls(markdownContent) {
  const urls = [];

  remark().use(frontmatter, ['yaml', 'toml']).use(collectImageUrl, urls).processSync(markdownContent);

  return urls;

  function collectImageUrl(array) {
    return (tree) => {
      visit(tree, 'image', (node) => {
        array.push(node.url);
      });
    };
  }
}

function stripHash(url) {
  const u = new URL(url);
  u.hash = '';
  return u.toString();
}

function getMarkdownImageMeta($, imageUrl) {
  // 根据图片地址找到 html 中的 img 节点
  const sel = $(`img[src^="${stripHash(imageUrl)}"]`);
  // <p> 上面可能保存着图片的对齐信息
  const paragraph = sel.parent().parent();
  const width = sel.css('width');
  const align = paragraph.css('text-align');

  return [width ? `width=${width}` : null, align].filter(Boolean).join(',');
}

module.exports = async function processYuqueMarkdown(
  { title, slug, body, html },
  { imagesOutputDir, needSetSidebarSlug },
  config,
) {
  console.log(`start process doc ${slug} ${title}`);

  const { uploadImage } = config;

  const getMarkdownImageUrl = (slug, filename) => {
    if (uploadImage.enabled) {
      const url = new URL(
        `${slug}/${filename}`,
        `https://${uploadImage.config.bucket}.${uploadImage.config.endpoint}/${uploadImage.prefix}`,
      );
      return url.href;
    } else {
      return path.join(config.output.images.replace(/^static/, ''), slug, filename);
    }
  };

  const $ = cheerio.load(html);

  let markdownContent = body;

  markdownContent = markdownContent
    // 移除多余的 <a name=...>
    .replace(/<a name="\w+"><\/a>\n?/g, '\n')

    // 将 br 替换为 \n\n （两个连续的 br 合并为一个 br）
    // .replace(/<br ?\/>(?!\s{0,8}<br ?\/>)/g, '\n\n')

    // 将 br 替换为 \n\n
    .replace(/<br ?\/>/g, '\n\n')
    // 在 br 两侧添加换行
    .replace(/<br ?\/>/g, '\n\n<br />\n\n');

  // 移除无意义的 **
  markdownContent = markdownContent.replace(/\n#* ?\*\*\n/g, '\n');

  // 整理星星✨ （语雀输出的 markdown 与 remark 不兼容的地方有点多，有点坑，这里要多检查下）
  markdownContent = cleanAsterisks(markdownContent);

  // 在头部添加 frontmatter
  const frontmatter = generateYamlFrontmatter([
    ['title', title],
    ['slug', needSetSidebarSlug ? '/' : null],
  ]);

  const comment =
    '<!-- \n' +
    '  这个文件是从语雀文档同步生成的，请不要手动修改\n' +
    `  语雀文档地址 https://www.yuque.com/${config.namespace}/${slug}\n` +
    `  同步时间：${dayjs().format('YYYY-MM-DD HH:mm:ss')}\n` +
    '-->\n\n';

  markdownContent = frontmatter + comment + markdownContent;

  // 获取所有的图片链接，并将图片下载到本地
  const urls = retrieveImageUrls(markdownContent);

  const imageMap = new Map();
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];

    if (config.saveImageToLocal) {
      const localDirectory = path.join(imagesOutputDir, slug);
      const filename = await saveRemoteFile(url, localDirectory);

      const markdownImageUrl = getMarkdownImageUrl(slug, filename);
      const markdownImageMeta = getMarkdownImageMeta($, url);
      imageMap.set(url, {
        url: markdownImageUrl,
        meta: markdownImageMeta,
      });
      console.log(`image ${stripHash(url)} -> ${markdownImageUrl}  #${markdownImageMeta}`);
    } else {
      const markdownImageMeta = getMarkdownImageMeta($, url);
      imageMap.set(url, {
        url: stripHash(url),
        meta: markdownImageMeta,
      });
      console.log(`image ${stripHash(url)}  #${markdownImageMeta}`);
    }
  }

  // 替换 markdown 文档中图片地址
  markdownContent = replaceImageUrls(markdownContent, imageMap);

  // 格式化 markdown
  markdownContent = formatMarkdown(markdownContent);

  return markdownContent;
};
