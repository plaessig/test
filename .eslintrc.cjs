module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    'airbnb-base',
  ],
  plugins: [
    'vue',
  ],
  env: {
    browser: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
    requireConfigFile: false,
  },
  ignorePatterns: [
    'blocks/**/*', // Ignore generated blocks
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        vue: 'never',
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': [2, { props: false }],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: [
        '**/*.test.js',
        '**/*.spec.js',
        'vite.config.js',
      ],
    }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs', '.vue'],
      },
    },
  },
};
