module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'interface-name': 'off',
        'variable-name': 'off',
        'ban-types': 'off',
        'member-ordering': 'off',
        'curly': 'off',
        'no-empty': 'off',
        'object-literal-sort-keys': 'off',
        'ordered-imports': 'off',
        'no-empty-function': 'off',
        '@typescript-eslint/no-empty-function': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                'multiline': {
                    'delimiter': 'none',
                    'requireLast': false
                },
                'singleline': {
                    'delimiter': 'comma',
                    'requireLast': false
                }
            }
        ],
        '@typescript-eslint/indent': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'no-unused-vars': 'off',
        'node/no-unsupported-features/es-syntax': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        'vue/no-unused-components': [
            'error',
            {
                'ignoreWhenBindingPresent': false
            }
        ],
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        "quotes": [2, "single", { "avoidEscape": true }]
    }
};
