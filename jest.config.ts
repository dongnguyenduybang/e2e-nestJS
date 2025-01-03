export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '\\.spec\\.ts$',  // Tìm tất cả các file .spec.ts
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
};
