import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import os from 'node:os';
import { up } from './up.js';
import { cd } from './cd.js';
import { ls } from './ls.js';
import { cat } from './cat.js';
import { add } from './add.js';
import { rn } from './rn.js';

const getUsername = () => {
    const myArgs = Object.values(process.argv).slice(2);
    const usernameFromInput = myArgs.toString().split('=').pop();
    return usernameFromInput ? usernameFromInput : 'Anonimus';
};

const start = async () => {
    const rl = readline.createInterface({ input, output });

    const username = getUsername();
    let currentDir = os.homedir();

    rl.write(`Welcome to the File Manager, ${username}!\n`);
    rl.write(`You are currently in ${currentDir}\n`);

    rl.on('line', async (line) => {
        const inputPath = line.trim().split(' ')[1];
        const inputFileName = line.trim().split(' ')[1];
        const inputNewFileName = line.trim().split(' ')[2];

        switch (line.trim()) {
            case 'up':
                const newCurrDir = up(currentDir);
                currentDir = newCurrDir;
                console.log(`You are currently in ${currentDir}`);
                break;

            case `cd ${inputPath}`:
                currentDir = await cd(currentDir, inputPath);
                console.log(`You are currently in ${currentDir}`);
                break;

            case 'ls':
                await ls(currentDir);
                console.log(`You are currently in ${currentDir}`);
                break;

            case `cat ${inputPath}`:
                await cat(currentDir, inputPath);
                console.log(`You are currently in ${currentDir}`);
                break;

            case `add ${inputFileName}`:
                await add(currentDir, inputFileName);
                console.log(`You are currently in ${currentDir}`);
                break;

            case `rn ${inputPath} ${inputNewFileName}`:
                await rn(currentDir, inputPath, inputNewFileName);
                console.log(`You are currently in ${currentDir}`);
                break;

            case '.exit':
                rl.close();
                break;

            default:
                console.log(`Invalid input`);
                break;
        }
        rl.prompt();
    });

    rl.on('close', () => {
        console.log(`Thank you for using File Manager, ${username}, goodbye!`);
        process.exit(0);
    });
};

await start();
