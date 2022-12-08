import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
// import { getUserHomeDir, getUsername } from './utils';
import os from 'node:os';
import { up } from './up.js';

const getUsername = () => {
    let username = '';
    const myArgs = Object.values(process.argv).slice(2);
    const usernameFromInput = myArgs.toString().split('=').pop();
    username = usernameFromInput ? usernameFromInput : 'Anonimus';
    return username;
};

const getUserHomeDir = () => {
    const userHomeDir = os.homedir();
    return userHomeDir;
};


const start = async () => {
    const rl = readline.createInterface({ input, output });

    const username = getUsername();
    let currentDir = getUserHomeDir();

    rl.write(`Welcome to the File Manager, ${username}!\n`);
    rl.write(`You are currently in ${currentDir}\n`);

    rl.on('line', (line) => {
        switch (line.trim()) {

            case 'up':
                currentDir = up(currentDir);
                console.log(`You are currently in ${currentDir}`);
                break;

            // case 'cd':
            //     console.log('cd');
            //     console.log(`You are currently in ${currentDir}`);
            //     break;

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
