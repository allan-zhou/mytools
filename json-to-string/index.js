const fs = require('fs');
const path = require('path');


const file = path.resolve(__dirname, './source/users.json');
const result = JSON.parse(fs.readFileSync(file));

console.log(result.length);

const arr01 = [];

result.forEach((element) => {
  if (element) {
    const account = element.email.split('@')[0];
    arr01.push(`"${account}"`);
  }
});

console.log(arr01.length);

fs.writeFile('./target/users.txt', arr01.join(','), (err) => {
  if (err) throw err;
});
