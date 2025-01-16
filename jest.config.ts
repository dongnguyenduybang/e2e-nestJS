import dotenv from 'dotenv';

export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '\\.spec\\.ts$',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    },
    // Nạp file .env trước khi chạy test
    setupFiles: ['dotenv/config'],
    preset: 'ts-jest',
    moduleNameMapper: {
        '#ansi-styles': 'ansi-styles', // Khắc phục lỗi ESM của chalk
    },
    globals: {
        'ts-jest': {
            useESM: true, // Kích hoạt ESM trong ts-jest
        },
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], // Xem các tệp TypeScript là ESM
    maxWorkers: 2, // Giới hạn số lượng worker
};
