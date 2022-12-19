import path from 'node:path';

export const up = (currentDirName) => {
    return path.join(currentDirName, '..');
};