module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  root: true,

  env: {
    node: true,
  },

      // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#configuration
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    parser: "@typescript-eslint/parser",
      // We provide a relative path to the tsconfig.json here
      // so we can use tsconfigRootDir option into devland to specify the actual configuration path
      project: "./tsconfig.json",
    // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionstsconfigrootdir
    tsconfigRootDir: __dirname,
  },

  extends: [
    // Base ESLint recommended rules
    "eslint:recommended",

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",

    // https://github.com/prettier/eslint-config-prettier#installation
    "prettier",
  ],

  plugins: [
    "@typescript-eslint"

    // https://github.com/typescript-eslint/typescript-eslint/issues/389#issuecomment-509292674
    // Prettier has not been included as plugin to avoid performance impact
    // add it as an extension for your IDE
  ],

  // add your custom rules here
  rules: {
    curly: "error",
    "no-else-return": ["warn", { allowElseIf: false }],
    eqeqeq: "error",
    "no-alert": "warn",
    "prefer-const": "warn",

    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unnecessary-condition": "warn",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],

    "no-console": "off",
  },
};
