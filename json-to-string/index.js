let fs = require('fs');
let path = require('path');


let file = path.resolve(__dirname, './source/users.json');
let result = JSON.parse(fs.readFileSync(file));

console.log(result.length);

let arr01 = [];

result.forEach(function(element) {
    if(element.account){
        arr01.push(`\'${element.account}\'`);
    }
});

console.log(arr01.length);

fs.writeFile('./target/users.txt',arr01.join(','),(err)=>{
    if(err) throw err;
});
