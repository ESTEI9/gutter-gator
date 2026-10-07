export default {
  rules: {
    "selector-type-no-unknown": [
      true,
      {
        ignoreTypes: ["/^gg-/", "/^ion-/", "/^ng-/"],
      },
    ],
    "unit-disallowed-list": [[]],
    "selector-no-qualifying-type": null,
  },
};
