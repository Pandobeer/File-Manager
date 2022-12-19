import zlib from 'node:zlib';
import { pipeline } from 'stream';
import fs from 'node:fs';
import { stat } from 'node:fs/promises';
import { basename } from 'node:path';

import { getAbsolutePath } from './utils/helpers.js';


export const decompress = async (currentDir, pathToFile, pathToDestDir) => {
    const decompressedFilename = basename(pathToFile).split('.br')[0];

    const filetoToDecompressPath = getAbsolutePath(currentDir, pathToFile);
    const fileDecompressedPath = getAbsolutePath(currentDir, pathToDestDir, decompressedFilename);
    const dirDecompressedPath = getAbsolutePath(currentDir, pathToDestDir);

    try {
        await stat(filetoToDecompressPath).then((file) => {
            if (!file.isFile()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${filetoToDecompressPath} is not a file or does not exist.`);
        });

        await stat(dirDecompressedPath).then((dir) => {
            if (!dir.isDirectory()) {
                throw Error();
            }
        }).catch(() => {
            throw Error(`${dirDecompressedPath} is not a directory or does not exist.`);
        });

        const brotli = zlib.createBrotliDecompress();
        const readStream = fs.createReadStream(filetoToDecompressPath);
        const writeStream = fs.createWriteStream(fileDecompressedPath, { flags: 'wx' });

        pipeline(readStream, brotli, writeStream, (err) => {
            if (err) {
                console.error(`Operation failed: ${err.message}`);
                process.exitCode = 1;
            } else {
                console.log(`${decompressedFilename} is decompressed!`);
            }
        });
    } catch (err) {
        console.error(`Operation failed: ${err.message}`);
    }
};  