const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

stdout.write('Hello checker!!!\nWrite into file: ');
stdin.on('data', data=>{
    const text = data.toString();
    fs.writeFile(
        path.join(__dirname, 'text.txt'),
        text,
    
        (err) => {
            if (err) throw err;
            console.log('Файл был создан');
            process.exit();
        }
    );
})

