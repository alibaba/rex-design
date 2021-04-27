const path = require('path');
const fs = require('fs');
const light = require('../src/tokens/light.json');
const dark = require('../src/tokens/dark.json');
const pc = require('../src/tokens/pc.json');
const pad = require('../src/tokens/pad.json');
const phone = require('../src/tokens/phone.json');
const zIndices = require('../src/tokens/z-index.json');

function objectToVariables(obj, prefix = '--rex') {
  let paths = [];
  Object.keys(obj).forEach((key) => {
    const keypath = prefix ? [prefix, key].join('-') : key;
    if (typeof obj[key] === 'string') {
      paths.push([keypath, obj[key] || 'unset']);
    } else {
      paths = paths.concat(objectToVariables(obj[key], keypath));
    }
  });
  return paths;
}

function buildCss(object, filepath) {
  const tokens = objectToVariables(object);
  const ret = `
    body, page {
      ${tokens.map((item) => item.join(':')).join(';\n')}
    }
  `;

  fs.writeFileSync(filepath, ret);
}

function buildTs(tokens, filepath) {
  const ret = `
    export default ${JSON.stringify(tokens)}
  `;
  fs.writeFileSync(filepath, ret);
}

(function () {
  const phoneLight = {
    ...light,
    ...phone,
    ...zIndices,
  };
  const phoneDark = {
    ...dark,
    ...phone,
    ...zIndices,
  };
  const padLight = {
    ...light,
    ...pad,
    ...zIndices,
  };
  const padDark = {
    ...dark,
    ...pad,
    ...zIndices,
  };
  const pcLight = {
    ...light,
    ...pc,
    ...zIndices,
  };
  const pcDark = {
    ...dark,
    ...pc,
    ...zIndices,
  };

  buildTs(phoneLight, path.join(__dirname, '../src/theme/phone-light.ts'));
  buildTs(phoneDark, path.join(__dirname, '../src/theme/phone-dark.ts'));
  buildTs(padLight, path.join(__dirname, '../src/theme/pad-light.ts'));
  buildTs(padDark, path.join(__dirname, '../src/theme/pad-dark.ts'));
  buildTs(pcLight, path.join(__dirname, '../src/theme/pc-light.ts'));
  buildTs(pcDark, path.join(__dirname, '../src/theme/pc-dark.ts'));

  buildCss(phoneLight, path.join(__dirname, '../src/theme/phone-light.css'));
  buildCss(phoneDark, path.join(__dirname, '../src/theme/phone-dark.css'));
})();
