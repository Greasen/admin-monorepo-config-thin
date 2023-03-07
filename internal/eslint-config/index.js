const { defineConfig } = require('eslint-define-config')

// module.exports = defineConfig({
//   extends: ['@antfu'],
//   parser: 'vue-eslint-parser',
//   parserOptions: {
//     parser: '@typescript-eslint/parser',
//     sourceType: 'module',
//   },
//   env: {
//     // Your environments (which contains several predefined global variables)
//     // browser: true,
//     // node: true,
//     // mocha: true,
//     // jest: true,
//     // jquery: true
//   },
//   globals: {
//     // Your global variables (setting to false means it's not allowed to be reassigned)
//     // myGlobal: false
//   },
//   rules: {
//     // Customize your rules
//     // Please keep this rule off because it requiresTypeChecking
//     // https://github.com/vuejs/vue-eslint-parser/issues/104
//     // https://github.com/typescript-eslint/typescript-eslint/pull/5318
//     'no-console': 'off',
//   },
// })

const ERROR = 'error'
const WARN = 'warn'
const OFF = 'off'

module.exports = defineConfig({
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // eslint
    'no-undef': 'off', // defineOptions 是库，没有声明
    'no-confusing-arrow': WARN, // 箭头函数过长，需要加括号，方便阅读
    'prefer-const': ERROR, // const > let
    'no-extra-boolean-cast': OFF, // 有时为了兼容ts的boolean类型不得不使用, // 类型的转换应该通过其他方式，而不是修改规则，
    'no-empty': ['error', { allowEmptyCatch: true }], // 该规则不允许空块语句
    'no-constant-condition': ['error', { checkLoops: false }], // 作为测试条件的常量表达式（例如，文字）可能是特定行为的拼写错误或开发触发器
    // 'no-useless-escape': 'off', // 禁止不必要的转义字符
    'no-prototype-builtins': 'off', // 允许Object.prototype直接在对象实例上调用某些方法
    'no-redeclare': 'off',

    // vue
    'vue/no-duplicate-attributes': [
      ERROR,
      {
        allowCoexistClass: true,
        allowCoexistStyle: true,
      },
    ],
    'vue/html-self-closing': OFF, // 不强制是否自闭合
    'vue/multi-word-component-names': OFF, // 不一定所有的组件都是多单词，比如app.vue，人为控制
    'vue/prefer-true-attribute-shorthand': WARN,
    'vue/v-on-function-call': [WARN],
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
      },
    ],
    'vue/valid-next-tick': OFF, // nextTick 不需要加 await
    'vue/no-v-html': OFF, // 有些时候，比如el-tooltip中，需要使用v-html控制样式
    'vue/no-v-text': ERROR,
    'vue/prefer-import-from-vue': 'off',// 关闭强制从“vue”导入，而不是从“@vue/*”导入，如果使用 vue 的相关库就会报错

    // typescript
    '@typescript-eslint/no-explicit-any': OFF, // typescript使用初期，不可避免使用any
    '@typescript-eslint/no-empty-function': OFF, // 有的时候需要一个空函数进行占位
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // 变量未使用，发出警告
    '@typescript-eslint/no-non-null-assertion': 'off', // !是一个类型脚本non-null断言。它告诉typescript“我知道value看起来可能是空的，但相信我，它不是空的”
    '@typescript-eslint/ban-types': 'off', // 禁止以使默认规则出错并为附加/自定义规则抛出警告
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', disallowTypeAnnotations: false }], // 强制使用类型导入，区别正常导入
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],// 强制类型定义始终使用interface或type
    '@typescript-eslint/semi': ['warn', 'never'], // 其实加不加这个影响不大，就是结尾的分号，但是为了统一，这边还是加了
    '@typescript-eslint/no-redeclare': 'error', // 这个是扩展了no-redeclare规则。它增加了对 TypeScript 函数重载和声明合并的支持
  },
})
