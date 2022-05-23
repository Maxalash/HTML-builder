
const fs = require('fs');
const fsPromises = require('fs/promises')
const path = require('path');
const { stdin, stdout } = process;
const copyFrom = path.join(__dirname, 'files');
const copyTo = path.join(__dirname, 'files-copy');
const rmprom = fsPromises.rmdir(copyTo, { recursive: true })
rmprom.then(() => {
    fsPromises.mkdir(copyTo, { recursive: true });
    function listObjects(path2) {
        fs.readdir(path2, (err, files) => {
            if (err) throw err;
            let path1;
            for (let file of files) {
                path1 = path.join(path2, file)
                fs.stat(path1, async (err, stats) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    path1 = path.join(path2, file)

                    if (stats.isDirectory()) {
                        listObjects(path1);
                    } else {
                        try {
                            const path3 = path.join(copyTo, file)
                            await fsPromises.copyFile(path1, path3);
                        } catch {
                            console.log('The file could not be copied');
                        }
                    }
                });
            }
        });
    };

    listObjects(copyFrom);
})