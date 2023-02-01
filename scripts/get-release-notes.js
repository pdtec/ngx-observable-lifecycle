#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const file = readline.createInterface({
    input: fs.createReadStream('./changelog.md'),
    // output: process.stdout,
    // terminal: false
});

let versionsRead = 0;
file.on('line', (line) => {
    if (line.startsWith('## ')) {
        versionsRead++;
        return;
    }

    if (versionsRead >= 2) {
        process.exit(0);
    }

    process.stdout.write(`${line}\n`);
});
