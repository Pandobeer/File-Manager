import fs from 'node:fs/promises';
import path from 'node:path';

const isFile = async (value) => {
    try {
        const stat = await fs.lstat(value);
        return stat.isFile();
    } catch (err) {
        throw Error('can not get file stats');
    }
};

export const ls = async (currentDir) => {
    try {
        const items = await fs.readdir(currentDir, { withFileTypes: true });

        const itemsWithTypes = await Promise.all(items.map(async (item) => ({
            Name: item.name.toString(),
            Type: await isFile(path.resolve(currentDir, item.name)) ? 'file' : 'directory'
        })));
        const sortedItems = itemsWithTypes.sort((a, b) => {
            if (a.Type === b.Type) {
                return a.Name.localeCompare(b.Name);
            }
            return a.Type === 'directory' ? -1 : 1;
        });

        console.table(sortedItems);
    } catch (err) {
        console.error(`Operation failed: ${err.message}`);
    }
};