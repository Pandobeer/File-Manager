import path from 'node:path';

export const getAbsolutePath = (currentDir, pathToDir) => {
    return path.resolve(currentDir, pathToDir);
};