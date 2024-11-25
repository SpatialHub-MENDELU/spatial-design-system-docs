module.exports = {
    root: true,
    env: {
      node: true,
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/eslint-config-typescript', 
    ],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'warn',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/valid-v-slot': 'error', 

      '@typescript-eslint/explicit-module-boundary-types': 'off', 
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
  
      'no-console': 'warn',
      'no-debugger': 'warn',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'eqeqeq': ['error', 'always'],
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'no-trailing-spaces': 'error',
    },
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
  };
  