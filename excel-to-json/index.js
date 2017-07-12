const fs = require('fs');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('./source/users.xlsx');

const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
  raw: true,
});

console.log(typeof json);
console.log(json);

// 写入到文件
fs.writeFile('./target/users.json', JSON.stringify(json));

// XLSX内置写入方法
XLSX.writeFile(workbook, './target/users.csv');
