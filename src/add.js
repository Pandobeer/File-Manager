import fs from 'node:fs/promises';
import { getAbsolutePath } from './utils/helpers.js';

export const add = async (currentDir, fileName) => {
    const combinedPath = getAbsolutePath(currentDir, fileName);

    fs.writeFile(combinedPath, '', { flag: 'wx' }).catch((err) => {
        console.error(`Operation failed: ${err.message}`);
    });
};