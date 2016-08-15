#!/usr/bin/env node
const program = require('../index');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
