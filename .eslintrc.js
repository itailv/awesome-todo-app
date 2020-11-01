module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
    settings: {
        react: {
            version: 'detect'
        }
    },
    rules: {
        'no-param-reassign': 'off',
        'padded-blocks': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off', // i don't give a damn
        'arrow-parens': ['error', 'as-needed', {
            'requireForBlockBody': true
        }],
        semi: [2, "always"]
    },
};
