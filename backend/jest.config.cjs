module.exports = {
    testEnvironment: 'node', 
    setupFiles: ['./jest.setup.js'], 
    moduleDirectories: [
        'node_modules', 
        '<rootDir>', 
    ],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',  // Transform JS and JSX files using Babel
    },
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)", 
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    moduleFileExtensions: [
        "js",
        "jsx", 
        "json",
        "node"
    ],
};