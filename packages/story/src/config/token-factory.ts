interface FactoryConfig {
  width?: number;
  height?: number;
  diagonal?: number;
  /**
   * 最小阅读距离
   */
  distance?: number;
}

// 获取大于当前值的最小整数
function getLatestIntegerLargeThenNumber(num: number) {
  return Math.floor(num + 1);
}

function calculateFontSize(config: FactoryConfig) {
  const { width, height, diagonal, distance } = config;
  const ppi = Math.sqrt(width ** 2 + height ** 2) / diagonal;
  const suggested = distance / 70 / 0.3527 / (72 / ppi);
  const min = distance / 140 / 0.3527 / (72 / ppi);
  const max = distance / 55 / 0.3527 / (72 / ppi);

  return {
    min: getLatestIntegerLargeThenNumber(min), // 最小值
    max: getLatestIntegerLargeThenNumber(max), // 最大值
    base: getLatestIntegerLargeThenNumber(suggested), // 基准值
  };
}

interface FontListConfig {
  /**
   * 左侧个数
   */
  leftCount?: number;
  /**
   * 右侧个数
   */
  rightCount?: number;
  leftOffset?: number;
  rightOffset?: number;
  /**
   * 基准值
   */
  base: number;
}

function calulateFontList(config: FontListConfig) {
  const { leftCount = 2, rightCount = 3, leftOffset = 1, rightOffset = 2, base } = config;

  const list = [];

  for (let i = 0; i < leftCount; i++) {
    list.unshift(base - (i + 1) * leftOffset);
  }

  for (let i = 0; i <= rightCount; i++) {
    list.push(base + i * rightOffset);
  }

  return list;
}

const FONT_SIZE_TOKENS = ['note', 'body', 'subtitle', 'title', 'subheader', 'header'];

export function generateFontSizeTokens(config: FactoryConfig) {
  const size = calculateFontSize(config);
  const fontSizeList = calulateFontList({
    base: size.base,
  });

  const ret = {};

  fontSizeList.forEach((val, i) => {
    ret[FONT_SIZE_TOKENS[i]] = val;
  });

  return ret;
}
