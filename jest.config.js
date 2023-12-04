/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/202[23]/Day**/solution.ts'],
  testPathIgnorePatterns: ["/node_modules/", "utils.ts"]
}
