module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react',
    '@typescript-eslint/eslint-plugin',
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
  },
}
