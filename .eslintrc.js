module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/prefer-stateless-function': [0],
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': [0],
    'react/destructuring-assignment': [0],
    'class-methods-use-this': 'off',
    'react/function-component-definition': [0],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': [0],
    'react/jsx-curly-spacing': [2, { when: 'never', allowMultiline: false }],
    'operator-linebreak': ['error', 'after'],
    'react/state-in-constructor': ['error', 'never'],
  },
};
