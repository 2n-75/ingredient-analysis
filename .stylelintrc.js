module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-recess-order'],
  customSyntax: '@stylelint/postcss-css-in-js',
  rules: {
    'value-keyword-case': null,
    'declaration-property-unit-allowed-list': {
      'font-size': ['px'],
      'line-height': [],
    },
  },
}
