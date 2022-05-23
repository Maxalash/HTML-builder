const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const copyTo = path.join(__dirname, 'project-dist');
fsPromises.mkdir(copyTo, { recursive: true });


async function solutionForSync(files, path2, init){
  let inner = init;
  let path1;
  const file = files.pop();
  path1 = path.join(path2, file);
  const stats = await fsPromises.stat(path1);
  path1 = path.join(path2, file);

  if (stats.isDirectory()) {
    inner = listObjects0(path1, inner);
  } else {
    if (file.split('.')[1] == 'html') {
      try {
        const final = fsPromises.readFile(path.join(path2, file));
        const data5 =await final;
        inner = inner.replaceAll('{{' + file.split('.')[0] + '}}', data5.toString());
        console.log(inner);
        const some = fsPromises.writeFile(
          path.join(copyTo, 'index.html'),
          inner
        );
        some.then(async () => {
          if(files.length === 0) return inner;
          else return await solutionForSync(files, path2, inner);
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function listObjects0(path2, init) {
  const files = await fsPromises.readdir(path2);
    
  console.log( await solutionForSync(files, path2, init));

}


fs.readFile(
  path.join(__dirname, 'template.html'),
  (err, data) => {
    if (err) throw err;
    const inner = data.toString();
    fs.writeFile(
      path.join(copyTo, 'index.html'),
      inner,
      (err) => {
        if (err) throw err;
      }
    );
    listObjects0(path.join(__dirname, 'components'), inner);
  }
);




fs.writeFile(
  path.join(copyTo, 'style.css'),
  ' ',
  (err) => {
    if (err) throw err;
  }
);
function listObjects1(path2) {
  fs.readdir(path2, (err, files) => {
    if (err) throw err;
    let path1;
    for (let file of files) {
      path1 = path.join(path2, file);
      fs.stat(path1, async (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        path1 = path.join(path2, file);

        if (stats.isDirectory()) {
          listObjects1(path1);
        } else {
          if (file.split('.')[1] == 'css') {
            try {

              fs.readFile(
                path.join(path2, file),
                'utf-8',
                (err, data) => {
                  if (err) throw err;
                  fs.appendFile(
                    path.join(copyTo, 'style.css'),
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

listObjects1(path.join(__dirname, 'styles'));


function listObjects2(path2, path4) {
  fs.readdir(path2, (err, files) => {
    if (err) throw err;
    let path1;
    for (let file of files) {
      path1 = path.join(path2, file);
      fs.stat(path1, async (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        path1 = path.join(path2, file);

        if (stats.isDirectory()) {
          fsPromises.mkdir(path.join(copyTo, 'assets', file), { recursive: true });
          listObjects2(path1, path.join(copyTo, 'assets', file));
        } else {
          try {
            const path3 = path.join(path4, file);
            await fsPromises.copyFile(path1, path3);
          } catch {
            console.log('The file could not be copied');
          }
        }
      });
    }
  });
}

const rmprom = fsPromises.rm(path.join(copyTo, 'assets'), { recursive: true, force:true });
rmprom.then(() => {
  fsPromises.mkdir(path.join(copyTo, 'assets'), { recursive: true });
  listObjects2(path.join(__dirname, 'assets'), copyTo);
});
