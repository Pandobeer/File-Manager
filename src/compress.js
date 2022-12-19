import zlib from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
import { getAbsolutePath } from './utils/helpers.js';

export const compress = async (currentDir, pathToFile, pathToCompressedFile) => {
    const fileToCompressPath = getAbsolutePath(currentDir, pathToFile);
    const fileCompressedPath = getAbsolutePath(currentDir, pathToCompressedFile);

    const brotli = zlib.createBrotliCompress();
    const readStream = fs.createReadStream(fileToCompressPath);
    const writeStream = fs.createWriteStream(fileCompressedPath, { flags: 'wx' });

    await pipeline(readStream, brotli, writeStream).catch((err) => {
        console.error(`Operation failed: ${err.message}`);
        process.exitCode = 1;
    });
};