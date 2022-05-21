const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'files-copy'), { force: true, recursive: true }, (err) => {
  if (err) throw err;
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, items) => {
      if (err) throw err;
      items.forEach((i) => {
        fs.copyFile(path.join(__dirname, 'files', i.name), path.join(__dirname, 'files-copy', i.name), (err) => {
          if (err) throw err;
        });
      });
    });
  });
});
