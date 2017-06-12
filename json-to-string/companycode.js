let fs = require('fs');
let path = require('path');

let file = path.resolve(__dirname, './source/companycode.json');
let result = JSON.parse(fs.readFileSync(file));

console.log(result.length);

let arr01 = [];
let arr02 = [];

result.forEach(function(element) {
    if(element.CompanyCode){
        arr01.push(`\'${element.CompanyCode}\'`);
    }
    arr02.push(`\'${element.suppliercode}\'`);
});

console.log(arr01.length);
console.log(arr02.length);

fs.writeFile('./target/companycode.txt',arr01.join(','),(err)=>{
    if(err) throw err;
});
fs.writeFile('./target/suppliercode.txt',arr02.join(','),(err)=>{
    if(err) throw err;
});
