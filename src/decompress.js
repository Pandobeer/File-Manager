import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import { basename } from 'node:path';

import { getAbsolutePath } from './utils/helpers.js';


export const decompress = async (currentDir, pathToFile, pathToDestDir) => {
    const decompressedFilename = basename(pathToFile).replace('.br', '');

    const filetoToDecompressPath = getAbsolutePath(currentDir, pathToFile);
    const fileDecompressedPath = getAbsolutePath(currentDir, pathToDestDir, decompressedFilename);

    const brotli = zlib.createBrotliDecompress();
    const readStream = fs.createReadStream(filetoToDecompressPath);
    const writeStream = fs.createWriteStream(fileDecompressedPath, { flags: 'wx' });

    await pipeline(readStream, brotli, writeStream).catch((err) => {
        console.error(`Operation failed: ${err.message}`);
        process.exitCode = 1;
    });
};