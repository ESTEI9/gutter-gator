import stylistic from "@stylistic/eslint-plugin";

// @ts-check
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: ["projects/**/*"],
    extends: [...angular.configs.tsRecommended],
    plugins: [
        { "@stylistic": stylistic },
        "no-explicit-undefined"
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "object-curly-spacing": ["error", { before: true, after: true }],
      indent: ["error", 4],
      "comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/no-trailing-spaces": "error",
      semi: ["warn", "always"],
      "@stylistic/arrow-spacing": "warn",
      quotes: ["off"],
      "sort-imports": [
        "error",
        {
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          ignoreCase: true,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        },
      ],
      "@angular-eslint/component-class-suffix": [
        "error",
        { suffixes: ["Component"] },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "gg", style: "kebab-case" },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "gg", style: "camelCase" },
      ],
      "@stylistic/object-curly-newline": [
        "error",
        {
          ImportDeclarations: { multiline: true },
        },
      ],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@typescript-eslint/no-floating-promises": ["off"],
      "@typescript-eslint/unbound-method": ["off"],
      "import/first": "error",
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "type",
            "object",
            ["parent", "sibling"],
            "index",
            "unknown",
          ],
          pathGroups: [
            {
              pattern: "@angular/**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@ionic/**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@capacitor/**",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@environments/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["@angular"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended],
    rules: {},
  },
);
