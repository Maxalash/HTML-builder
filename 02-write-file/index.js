const fs = require('fs');
const path = require('path');
const {stdin, stdout} = process;

stdout.write('Hello checker!!!\nWrite into file: ');
stdin.on('data', data=>{
    const text = data.toString();
    if (text.trim()==='exit') process.exit();
    fs.appendFile(
        path.join(__dirname, 'text.txt'),
        text,
    
        (err) => {
            if (err) throw err;
        }
    );
})
process.on('SIGINT', function(){
    process.exit();
});
process.on('exit',function(){
    process.stdout.write('\nGoodbyr dear checker!! \n');
    process.exit();
})
