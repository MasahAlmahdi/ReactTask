module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.css$': 'jest-transform-css',
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    }
  };