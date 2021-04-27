const fs = require('fs');
const path = require('path');

/**
 * 清空目标文件夹(不删除本身)
 * @param dir 目录path
 */
function cleanDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const curDir = fs.readdirSync(dir);
  for (let i = 0; i < curDir.length; i++) {
    const filepath = path.join(dir, curDir[i]);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      // 如果是文件夹则继续递归
      cleanDir(filepath);
    } else {
      // 删除文件
      fs.unlinkSync(filepath);
    }
  }
}

function _isNumerical(obj) {
  const _obj = obj - 0;
  return obj === _obj;
}

/**
 * 将短横命名转换为驼峰命名（React 组件）
 */
function camelize(string) {
  if (_isNumerical(string)) {
    return string;
  }
  string = string.replace(/[\-_\s]+(.)?/g, (match, chr) => {
    return chr ? chr.toUpperCase() : '';
  });

  return string.substr(0, 1) + string.substr(1);
}

/**
 * diff 对象数组，实现增量更新
 * o: 原对象数组
 * n: 新对象数组
 * attr: 对比标准
 */
async function diff(o, n, attr = 'name') {
  const map = new Map();
  const readyToDiff = [...n, ...o];
  return readyToDiff.filter((item) => !map.has(item[attr]) && map.set(item[attr], 1));
}

module.exports = { cleanDir, camelize, diff };
