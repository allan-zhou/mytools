const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const csv = require('csv');
const iconv = require('iconv-lite');

const vhallfile = path.resolve(__dirname, '../data/微吼直播观看详情0804.csv');
const vhallfile2 = path.resolve(__dirname, '../data/微吼直播观看详情0804-filter.csv');
const contacts = path.resolve(__dirname, '../data/通讯录0804.xls');

const workbook = XLSX.readFile(contacts);
const workbook_users = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);

const userNames = workbook_users.map(it => it.name);

const rs = fs.createReadStream(vhallfile);
const ws = fs.createWriteStream(vhallfile2);

const columns = {
  nickname: '昵称',
  enterTime: '进入时间',
  viewMinutes: '观看时长',
  viewFrom: '观看终端',
  viewLocation: '地理位置',
};

rs.pipe(iconv.decodeStream('GBK'))
  .pipe(iconv.encodeStream('utf8', { addBOM: true }))
  .pipe(csv.parse())
  .pipe(csv.transform((record) => {
    if (userNames.indexOf(record[0]) > -1) {
      return record;
    }
    return null;
  }))
  .pipe(csv.stringify({ rowDelimiter: 'windows', header: true, columns }))
  .pipe(ws);
