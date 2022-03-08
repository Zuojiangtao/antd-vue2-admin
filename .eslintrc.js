module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁止使用debugger
  },
}
