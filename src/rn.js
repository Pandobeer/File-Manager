import fs from 'node:fs/promises';
import { getAbsolutePath } from './utils/helpers.js';

export const rn = async (currentDir, pathToFile, newFileName) => {

    const oldPath = getAbsolutePath(currentDir, pathToFile);
    const newPath = getAbsolutePath(currentDir, newFileName);

    fs.rename(oldPath, newPath).catch((err) => {
        console.error(`Operation failed: ${err.message}`);
    });
};
