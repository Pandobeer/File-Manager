import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import { getAbsolutePath } from './utils/helpers.js';

export const hash = async (currentDir, pathTofile) => {

    try {
        const combinedPath = getAbsolutePath(currentDir, pathTofile);
        const readFile = await fs.readFile(combinedPath);
        const hash = createHash('sha256').update(readFile).digest('hex');
        console.log(`Hash sum is ${hash}`);
    } catch (err) {
        console.error(`Operation failed: ${err.message}`);

    }

};
