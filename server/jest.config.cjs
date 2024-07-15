module.exports = {
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    },
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'jsx'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };