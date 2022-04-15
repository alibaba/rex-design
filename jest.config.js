const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
const config = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', './jest.setup.ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '^lodash-es$': 'lodash',
  },
  coverageDirectory: 'coverage',
  testMatch: ['<rootDir>/packages/core/**/?(*.)+(spec|test).[jt]s?(x)'],
};

module.exports = config;
