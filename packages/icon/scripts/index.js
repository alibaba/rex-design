/**
 * 生成svg图像文件、json文件、type 文件。
 * svg图像文件：存储在 /assets/*
 * json文件：存放于 /svginfo.json，保存svg的id、name、<svg>元素
 * type文件：存放于 /src/types.json，用于 propTypes 提示信息
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const axios = require('axios');
const { readSync } = require('node-yaml');
const { cleanDir, diff } = require('./helpers');

const config = readSync(path.join(__dirname, '../iconfont.config.yml'));
const ICONFONT_API = 'https://www.iconfont.cn/open/project/detail.json';
const SVG_ATTR = ' width="1em" height="1em" fill="currentColor"';

const assetsDir = path.resolve('assets');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const init = () => {
  // 清空 assets 文件夹
  cleanDir(assetsDir);
};

/**
 * 从 iconfont 下载图标信息
 * @param iconfontPid iconfont 项目 pid
 * @return {array} icon array
 */
async function getIcons(iconfontPid, token) {
  const resp = await axios.get(`${ICONFONT_API}`, {
    params: {
      pid: iconfontPid,
      LG_TOKEN: token,
    },
  });

  if (resp && resp.status === 200 && resp.data && resp.data.code === 200) {
    return resp.data.data.icons;
  }

  throw new Error('网络请求 iconfont 失败');
}

/**
 * 将 svg 图片写入文件系统
 * @param icons icon array
 */
const _saveSvgToFile = async (icons) => {
  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i];
    fs.writeFile(`assets/${icon.name}.svg`, icon.svg_content, { flag: 'a' }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  return icons;
};

/**
 * 增量更新 svg 信息并写入 svginfo.json
 */
async function _updateSvgInfoToJSON(newIconArr) {
  const infoPath = path.join(__dirname, 'svginfo.json');
  const oldJson = await readFileAsync(infoPath);
  const oldIconArr = JSON.parse(String(oldJson));
  const icons = await diff(oldIconArr, newIconArr);

  await writeFileAsync(infoPath, JSON.stringify(icons));

  return icons;
}

/**
 * 将 SVG 格式化为 hippo design 标准格式
 */
function _formatSvgAttr(iconArr) {
  return iconArr.map((item) => {
    const svginfo = item.show_svg
      .replace(/\sfill="[\s\S]*?"/g, '')
      .replace(/\sclass="[\s\S]*?"/, '')
      .replace(/\sstyle="[\s\S]*?"/, SVG_ATTR)
      .replace(/\sversion="[\s\S]*?"/, '');
    return {
      id: item.id,
      name: item.name,
      svg_content: svginfo,
    };
  });
}

/**
 * icons 的 name 数组保存为 json，便于
 * 生成组件 typescript 联合类型
 */
async function _generatePropTypes(icons) {
  const content = `export type IconType =
  | ${icons.map((item) => `'${item.name}'`).join('\n  | ')}

  export const iconTypes: IconType[] = [
    ${icons.map((item) => `'${item.name}'`).join(', ')}
  ]
  `;

  await writeFileAsync('src/types.ts', content);
  return icons;
}

function boot() {
  init();
  getIcons(config.pid, config.token)
    .then(_formatSvgAttr)
    .then(_updateSvgInfoToJSON)
    .then(_saveSvgToFile)
    .then(_generatePropTypes)
    .catch((err) => {
      console.error(err);
    });
}

boot();
