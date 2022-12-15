import path from 'node:path';
import { access, constants } from 'node:fs/promises';

const getAbsolutePath = (currentDir, pathToDir) => {
    //TODO: to delete after checking

    // if (path.isAbsolute(pathToDir)) {
    // console.log('isAbsolute');
    // return pathToDir;
    return path.resolve(currentDir, pathToDir);
    //TODO: to delete after checking

    // } else {
    // return path.join(currentDir, pathToDir);
    // return path.resolve(currentDir, pathToDir);

    // }
};

export const cd = async (currentDir, pathToDir) => {
    const combinedPath = getAbsolutePath(currentDir, pathToDir);

    try {
        await access(combinedPath, constants.F_OK);
        return combinedPath;
    } catch (err) {
        console.error(`Operation failed: ${err}`);
        return currentDir;
    }
};
