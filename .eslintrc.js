module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 11,
        ecmaFeatures: {
            experimentalObjectRestSpread: true
        },
        sourceType: 'module'
    },
    extends: ['prettier', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    // add your custom rules here
    rules: {
        'no-console': 'off',
        'dot-notation': 'off',
        'handle-callback-err': 'off',
        'prettier/prettier': [
            'error',
            {
                printWidth: 150
            }
        ]
    }
}
