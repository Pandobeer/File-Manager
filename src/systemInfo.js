import os from 'node:os';

const getSystemInfo = () => {
    const eolSystemInfo = JSON.stringify(os.EOL);
    console.log(eolSystemInfo);
};

const getCpuSystemInfo = () => {
    const cpuSystemInfo = os.cpus();
    const amountCpus = `Overal amount of CPUS is ${cpuSystemInfo.length}, `;
    const modelMachine = `Model is ${cpuSystemInfo[0].model}, `;
    const clockRate = `Clock rate is ${cpuSystemInfo[0].speed / 1000} GHz`;

    console.log(amountCpus, modelMachine, clockRate);
};

const getHomeDir = () => {
    const homeDir = os.homedir();
    console.log(homeDir);
};

const getSystemUsername = () => {
    const systemUsername = os.userInfo().username;
    console.log(systemUsername);
};

const getArchitecture = () => {
    const architecture = os.arch();
    console.log(architecture);
};

export { getSystemInfo, getCpuSystemInfo, getHomeDir, getSystemUsername, getArchitecture };;;
