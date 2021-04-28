const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, { prefix: __dirname });

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper,

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // A map from regular expressions to paths to transformers
  transform: {
    '\\.tsx?$': 'ts-jest/dist',
    '\\.jsx?$': 'babel-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: [
    // TODO 移除 node_modules 会导致测试非常慢，后面需要进行优化
    // "/node_modules/",
    '\\.pnp\\.[^\\/]+$',
  ],
};
