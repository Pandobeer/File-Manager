import fs from 'node:fs';
import { basename } from 'node:path';

import { getAbsolutePath } from './utils/helpers.js';

const errorHandler = (err) => {
    console.error(`Operation failed: ${err.message}`);
};

export const cp = async (currentDir, pathToFile, pathToNewDir) => {
    const filename = basename(pathToFile);
    const combinedPathToFile = getAbsolutePath(currentDir, pathToFile);
    const dirPathDest = getAbsolutePath(currentDir, pathToNewDir, filename);

    const readStream = fs.createReadStream(combinedPathToFile);
    const writeStream = fs.createWriteStream(dirPathDest, { flags: 'wx' });

    readStream.pipe(writeStream);

    writeStream.on('end', () => {
        console.log('File copy complete');
    });

    readStream.on('error', errorHandler);
    writeStream.on('error', errorHandler);
};