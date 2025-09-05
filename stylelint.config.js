/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-upleveled'],
  rules: {
    'nesting-selector-no-missing-scoping-root': [
      true,
      {
        ignoreAtRules: ['utility'],
      },
    ],
  },
};

export default config;
