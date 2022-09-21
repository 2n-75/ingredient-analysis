module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./src/tsconfig.json'],
  },
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
    'plugin:eslint-comments/recommended',
  ],
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['**/*.js'],
}
