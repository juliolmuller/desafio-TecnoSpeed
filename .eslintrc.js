module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'lacussoft',
    'lacussoft/typescript',
  ],
  rules: {
    'no-console': 'off',
  },
}
