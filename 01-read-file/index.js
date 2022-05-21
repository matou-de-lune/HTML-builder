const fs = require('fs');
const path = require('path');

const input = fs.createReadStream(path.join(__dirname, 'text.txt'));

input.pipe(process.stdout);