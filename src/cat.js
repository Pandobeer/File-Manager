import fs from 'node:fs';
import { getAbsolutePath } from './utils/helpers.js';

export const cat = async (currentDir, pathToFile) => {
    const combinedPath = getAbsolutePath(currentDir, pathToFile);

    const stream = fs.createReadStream(combinedPath);

    stream.on('data', (chunk) => {
        console.log(chunk.toString());
    });

    stream.on('end', () => {
        console.log('Finished reading file');
    });

    stream.on('error', (err) => {
        console.error(`Operation failed: ${err.message}`);
    });
};
