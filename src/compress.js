import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import { basename } from 'node:path';

import { getAbsolutePath } from './utils/helpers.js';

export const compress = async (currentDir, pathToFile, pathToDestDir) => {
    const filename = basename(pathToFile);
    const compressedFile = `${filename}.br`;

    const fileToCompressPath = getAbsolutePath(currentDir, pathToFile);
    const fileCompressedPath = getAbsolutePath(currentDir, pathToDestDir, compressedFile);

    const brotli = zlib.createBrotliCompress();
    const readStream = fs.createReadStream(fileToCompressPath);
    const writeStream = fs.createWriteStream(fileCompressedPath, { flags: 'wx' });

    await pipeline(readStream, brotli, writeStream).catch((err) => {
        console.error(`Operation failed: ${err.message}`);
        process.exitCode = 1;
    });
};