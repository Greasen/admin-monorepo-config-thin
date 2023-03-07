module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-scss',
    'stylelint-config-prettier',
    'stylelint-config-prettier-scss',
  ],
  rules: {
    'annotation-no-unknown': null,
    'scss/no-global-function-names': null,
  },
}
