module.exports = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            tsConfig: './tests/tsconfig.json'
        }
    },
};