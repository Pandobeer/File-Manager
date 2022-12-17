import { access, constants } from 'node:fs/promises';
import { getAbsolutePath } from './utils/helpers.js';

export const cd = async (currentDir, pathToDir) => {
    const combinedPath = getAbsolutePath(currentDir, pathToDir);
    try {
        await access(combinedPath, constants.F_OK);
        return combinedPath;
    } catch (err) {
        console.error(`Operation failed: ${err}`);
        return currentDir;
    }
};
