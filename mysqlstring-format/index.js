const fs = require('fs');
const path = require('path');
const readline = require('readline');

const file = path.resolve(__dirname, './source/sqlfileds.txt');

const rl = readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    line = line.trim();

    //1-字段名称 2-字段类型 3-默认值 4-字段描述
    // parseFieldName(line);

    // parseFieldType(line);

    parseFieldComment(line);
});

rl.on('close', () => {
    // console.log('\n\n=====end=====\n\n');
});


function parseFieldName(lineString) {
    var fieldName = lineString.substring(1, lineString.indexOf('`', 1))
    console.log(fieldName);
}

function parseFieldType(lineString) {
    var startIndex = lineString.indexOf('`', 1) + 1;
    var endIndex = lineString.indexOf('NOT NULL');
    if (endIndex < 0) {
        endIndex = lineString.indexOf('DEFAULT');
        if(endIndex < 0) {
            endIndex = lineString.indexOf('COMMENT');
        }
    } 
    var fieldType = lineString.substring(startIndex, endIndex)
    console.log(fieldType.trim());
}

function parseFieldComment(lineString) {
    var startIndex = lineString.indexOf('COMMENT');
    if (startIndex > 0) {
        var endIndex = lineString.length - 1;

        var fieldComment = lineString.substring(startIndex, endIndex)
        // console.log(fieldComment);
        startIndex = fieldComment.indexOf('\'') + 1;
        endIndex = fieldComment.length - 1;

        fieldComment = fieldComment.substring(startIndex, endIndex)
        console.log(fieldComment);
    } else {
        console.log("");
    }
}