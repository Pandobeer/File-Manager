import fs from 'node:fs';
import { basename } from 'node:path';

import { getAbsolutePath } from './utils/helpers.js';

const errorHandler = (err) => {
    console.error(`Operation failed: ${err.message}`);
};

export const mv = async (currentDir, pathToFile, pathToNewDir) => {
    const filename = basename(pathToFile);
    const combinedPathToFile = getAbsolutePath(currentDir, pathToFile);
    const dirPathDest = getAbsolutePath(currentDir, pathToNewDir, filename);

    const sourceStream = fs.createReadStream(combinedPathToFile);
    const destStream = fs.createWriteStream(dirPathDest, { flags: 'wx' });

    sourceStream.pipe(destStream);

    sourceStream.on('end', () => {
        fs.unlink(combinedPathToFile, (err) => {
            if (err) {
                console.error(`Operation failed: ${err.message}`);
            };
            console.log('File was removed');
        });
    });

    sourceStream.on('error', errorHandler);
    destStream.on('error', errorHandler);
};