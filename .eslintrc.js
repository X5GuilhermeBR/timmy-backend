module.exports = {
    parser: "babel-eslint",
    env: {
      node: true,
      es6: true,
      jest: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:prettier/recommended",
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
    rules: {
      "prettier/prettier": ["error", { singleQuote: true, semi: true }],
    },
  };
  