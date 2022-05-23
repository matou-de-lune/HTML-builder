const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, items) => {
  if (err) throw err;
  items.forEach((i) => {
    if (i.isFile() && (path.extname(i.name) === '.css')) {
      fs.readFile(path.join(__dirname, 'styles', i.name), (err, data) => {
        if (err) throw err;
        output.write(`${data}\n`);
      });
    }
  });
});
