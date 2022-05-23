const fs = require('fs');
const path = require('path');

const readFrom = path.join(__dirname, 'secret-folder'); // из какой папки нужно всё прочитать

function listObjects(path2){
  fs.readdir(path2, (err, files) => {
    if(err) throw err;
    let path1;
    for (let file of files){
      path1 = path.join(path2, file);
      fs.stat(path1, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }
        if(stats.isDirectory()){
          path1 = path.join(path2, file);
          listObjects(path1);
        }else{
          const size=Math.round(stats.size / 1.024)/1000;
          const fdata = file.split('.');
          console.log(fdata[0]+' - '+fdata[1]+' - '+size+'kB');
        }
      });
    }
  });
}

listObjects(readFrom);