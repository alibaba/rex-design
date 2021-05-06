module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', ['pascal-case', 'lower-case']],
    'subject-case': [0],
  },
};
