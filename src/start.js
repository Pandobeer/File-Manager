import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import os from 'node:os';
import { up } from './up.js';
import { cd } from './cd.js';
import { ls } from './ls.js';
import { cat } from './cat.js';
import { add } from './add.js';
import { rn } from './rn.js';
import { rm } from './rm.js';
import { cp } from './cp.js';
import { getSystemInfo, getCpuSystemInfo, getHomeDir, getSystemUsername, getArchitecture } from './systemInfo.js';
import { hash } from './hash.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js';
import { mv } from './mv.js';
import { printDirectory } from './utils/helpers.js';

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
        const [_, arg1, arg2] = line.trim().split(' ');

        switch (line.trim()) {
            case 'up':
                const newCurrDir = up(currentDir);
                currentDir = newCurrDir;
                printDirectory(currentDir);
                break;

            case `cd ${arg1}`:
                currentDir = await cd(currentDir, arg1);
                printDirectory(currentDir);
                break;

            case 'ls':
                await ls(currentDir);
                printDirectory(currentDir);
                break;

            case `cat ${arg1}`:
                await cat(currentDir, arg1);
                printDirectory(currentDir);
                break;

            case `add ${arg1}`:
                await add(currentDir, arg1);
                printDirectory(currentDir);
                break;

            case `rn ${arg1} ${arg2}`:
                await rn(currentDir, arg1, arg2);
                printDirectory(currentDir);
                break;

            case `cp ${arg1} ${arg2}`:
                await cp(currentDir, arg1, arg2);
                printDirectory(currentDir);
                break;

            case `mv ${arg1} ${arg2}`:
                await mv(currentDir, arg1, arg2);
                printDirectory(currentDir);
                break;

            case `rm ${arg1}`:
                await rm(currentDir, arg1);
                printDirectory(currentDir);
                break;

            case `os ${arg1}`:
                switch (line.trim().split('--').pop()) {
                    case 'EOL':
                        getSystemInfo();
                        break;

                    case 'cpus':
                        getCpuSystemInfo();
                        break;

                    case 'homedir':
                        getHomeDir();
                        break;

                    case 'username':
                        getSystemUsername();
                        break;

                    case 'architecture':
                        getArchitecture();
                        break;

                    default:
                        console.log(`Invalid input`);
                        break;
                }
                printDirectory(currentDir);
                break;

            case `hash ${arg1}`:
                await hash(currentDir, arg1);
                printDirectory(currentDir);
                break;

            case `compress ${arg1} ${arg2}`:
                await compress(currentDir, arg1, arg2);
                printDirectory(currentDir);
                break;

            case `decompress ${arg1} ${arg2}`:
                await decompress(currentDir, arg1, arg2);
                printDirectory(currentDir);
                break;

            case '.exit':
                rl.close();
                break;

            default:
                console.log(`Invalid input`);
                printDirectory(currentDir);
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
