module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  parser: "babel-eslint",
  parserOptions: {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true,
          "modules": true,
          "experimentalObjectRestSpread": true
      }
  },
  rules: {
    "no-param-reassign": [0, {"props": false}],
    "class-methods-use-this": 0,
    "import/named": 0,
    "quotes": ['error', 'double'],
    "react/prop-types": 0,
    "react/sort-comp": 0,
    "react/no-unused-state": 0,
    "react/no-array-index-key": 0,
    "react/no-access-state-in-setstate": 0,
    "react/destructuring-assignment": 0,
    "react/button-has-type": 0,
    "object-curly-newline": ["error", {
      "ObjectExpression": "always",
      "ObjectPattern": { "multiline": true },
      "ImportDeclaration": "never",
      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
    }],
  },
};
