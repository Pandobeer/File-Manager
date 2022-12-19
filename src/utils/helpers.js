import path from 'node:path';

export const getAbsolutePath = (currentDir, pathToDir, filename = '') => {
    return path.resolve(currentDir, pathToDir, filename);
};

export const printDirectory = (currentDir) => {
    process.stdout.write(`You are currently in ${currentDir}\n`);
};