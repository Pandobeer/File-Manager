import path from 'node:path';

export const getAbsolutePath = (currentDir, pathToDir, filename = '') => {
    return path.resolve(currentDir, pathToDir, filename);
};