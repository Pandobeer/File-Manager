import zlib from 'node:zlib';
import { pipeline } from 'stream';
import fs from 'node:fs';
import { basename } from 'node:path';
import { stat } from 'node:fs/promises';


import { getAbsolutePath } from './utils/helpers.js';

export const compress = async (currentDir, pathToFile, pathToDestDir) => {
    const filename = basename(pathToFile);
    const compressedFile = `${filename}.br`;

    const fileToCompressPath = getAbsolutePath(currentDir, pathToFile);
    const fileCompressedPath = getAbsolutePath(currentDir, pathToDestDir, compressedFile);
    const dirCompressedPath = getAbsolutePath(currentDir, pathToDestDir);

    try {
        await stat(fileToCompressPath).then((file) => {
            if (!file.isFile()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${fileToCompressPath} is not a file or does not exist.`);
        });

        await stat(dirCompressedPath).then((dir) => {
            if (!dir.isDirectory()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${dirCompressedPath} is not a directory or does not exist.`);
        });

        const brotli = zlib.createBrotliCompress();
        const readStream = fs.createReadStream(fileToCompressPath);
        const writeStream = fs.createWriteStream(fileCompressedPath, { flags: 'wx' });

        pipeline(readStream, brotli, writeStream, (err) => {
            if (err) {
                console.error(`Operation failed: ${err.message}`);
                process.exitCode = 1;
            } else {
                console.log(`${filename} is compressed!`);
            }
        });
    } catch (err) {
        console.error(`Operation failed: ${err.message}`);
    }
};