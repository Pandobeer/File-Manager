import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import os from 'node:os';

const getUsername = () => {
    let userName = '';
    const myArgs = Object.values(process.argv).slice(2);
    const userNameFromInput = myArgs.toString().split('=').pop();
    userName = userNameFromInput ? userNameFromInput : 'Anonimus';
    return userName;
};

const getUserHomeDir = () => {
    const userHomeDir = os.homedir();
    return userHomeDir;
};


const start = async () => {
    const rl = readline.createInterface({ input, output });

    const username = getUsername();
    const userHomeDir = getUserHomeDir();

    rl.write(`Welcome to the File Manager, ${username}!\n`);
    rl.write(`You are currently in ${userHomeDir}\n`);

    rl.on('line', (line) => {
        switch (line.trim()) {

            // case'Up':

            case '.exit':
                rl.close();
                break;

            default:
                console.log(`Invalid input`);
                console.log(`You are currently in ${userHomeDir}`);
                break;
        }
        rl.prompt();
    });

    rl.on('close', () => {
        rl.write(`Thank you for using File Manager, ${username}, goodbye!\n`);
        process.exit(0);
    });
};

await start();
