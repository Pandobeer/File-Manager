# Node.js File Manager created by @Pandobeer

Comments on running / testing the File Manager: 

1. The program is started by npm-script start in following way:
npm run start -- --username=your_username

If you run the script in VS Code, which uses Powershell, please add a space before the name. In this way Powershell will understand provided name. Otherwise the name will be by default - Anonimus.
For example:
npm run start -- --username= Mikalai.

If you ran the script in Bash or use another variant to start the program, there is no need to add an additional space before the the name.
For example:
node src/start.js -- --username=Mikalai

2. Commands compress & decompress take as a first parameter path to a file to compress/decompress, and as a second parameter - path to destination folder.
For example:
compress d:/web/test1.txt d:/web/testing/
decompress d:/web/testing/test1.txt.br d:/web/





