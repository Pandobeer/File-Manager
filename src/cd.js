import { stat } from 'node:fs/promises';
import { getAbsolutePath } from './utils/helpers.js';

export const cd = async (currentDir, pathToDir) => {
    const combinedPath = getAbsolutePath(currentDir, pathToDir);
    try {
        const stats = await stat(combinedPath);

        if (stats.isFile()) {
            throw Error('not a directory');
        }
        return combinedPath;
    } catch (err) {
        console.error(`Operation failed: ${err}`);
        return currentDir;
    }
};
