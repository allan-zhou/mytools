const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const file = path.resolve(__dirname, './source/Attendee.xls');
const workbook = XLSX.readFile(file);

const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

// 写入到文件
fs.writeFile(path.resolve(__dirname, './target/users.json'), JSON.stringify(json));

// XLSX内置写入方法
// XLSX.writeFile(workbook, './target/users.csv');
