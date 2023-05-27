module.exports = {
    extends: [
        'plugin:vue/vue3-recommended',
    ],
    parser: 'vue-eslint-parser',
    rules: {
        'vue/v-on-event-hyphenation': ['warn', 'never'],
        'vue/attribute-hyphenation': ['warn', 'never'],
        'vue/no-unused-vars': 'warn',
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'indent': ['warn', 4],
        'no-multi-spaces': ['warn']
    },
    
};