const program = require('commander');
const marked = require('marked');
const fs = require('fs');
const path = require('path');
const renderer = require('./renderer');

function readFile(filename) {
    return new Promise((resolve, reject)=>fs.readFile(filename, (err, result)=> {
        if (err) {
            reject(`Can't load file ${filename}`);
        } else {
            resolve(result.toString(), filename);
        }
    }))
}

function parse(inputString, filename) {
    return new Promise((resolve, reject) => {
        marked(inputString, { renderer: renderer }, (err, result) => {
            if (err) {
                reject(`Can't parse file ${filename}`);
            }
            resolve(result);
        });
    });
}

function saveResult(text) {
    return new Promise((resolve, reject) => {
        if (program.output !== undefined) {
            fs.writeFile(program.output, text, (err, result) => {
                if (err) {
                    reject(`Can't write into file ${program.output}`);
                } else {
                    resolve(text);
                }
            })
        } else {
            process.stdout.write(text);
            resolve(text);
        }
    });
}

function processFile(filename) {
    readFile(filename)
        .then(parse)
        .then(saveResult)
        .catch((err) => {
            process.stderr.write(err);
        });
}

const version = JSON.parse(
    fs.readFileSync(path.join(__dirname, './package.json'))
).version;

program
    .version(version)
    .option('-o, --output [filename]', 'Write result into file instead of stout')
    .usage('[options] <file>');

program
    .action(processFile);

module.exports = program;
