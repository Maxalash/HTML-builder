const fs = require('fs');
const fsPromises = require('fs/promises')
const path = require('path');
const { stdin, stdout } = process;

const copyFrom = path.join(__dirname, 'styles');
const copyTo = path.join(__dirname, 'project-dist');
fsPromises.mkdir(copyTo, { recursive: true });
fs.writeFile(
    path.join(copyTo, 'bundle.css'),
    ' ',
    (err) => {
        if (err) throw err;
    }
)
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
                    if (file.split('.')[1] == 'css') {
                        try {
                            
                            fs.readFile(
                                path.join(copyFrom, file),
                                'utf-8',
                                (err, data) => {
                                    if (err) throw err;
                                    fs.appendFile(
                                        path.join(copyTo, 'bundle.css'),
                                        data,
                                        (err) => {
                                            if (err) throw err;
                                        }
                                    );
                                }
                            );
                        } catch {
                            console.log('The file could not be bundled');
                        }
                    }
                }
            });
        }
    });
}

listObjects(copyFrom);