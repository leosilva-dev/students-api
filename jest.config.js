/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  dir: '.',
  moduleDirectories: ['node_modules', 'src'],
  roots: ['src'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^repositories/(.*)$': '<rootDir>/src/repositories/$1',
  },
};
