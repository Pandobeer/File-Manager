import fs from 'node:fs/promises';
import { getAbsolutePath } from './utils/helpers.js';

export const rm = async (currentDir, pathTofile) => {
    const combinedPath = getAbsolutePath(currentDir, pathTofile);

    await fs.unlink(combinedPath).catch((err) => {
        console.error(`Operation failed: ${err.message}`);
    });
};