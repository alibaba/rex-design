module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  // testMatch: ['__tests__/*.[jt]s'],
  // collectCoverageFrom: ['tests/**/*.{ts,tsx,js,jsx}'],
  transform: { '.(ts|tsx)$': 'ts-jest/dist' },
  // transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
