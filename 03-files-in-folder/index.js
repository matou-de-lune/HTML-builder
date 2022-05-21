const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, items) => {
  if (err) throw err;
  items.forEach((i) => {
    if (i.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', i.name), (e, s) => {
        if (e) throw e;
        console.log(`${i.name.slice(0, i.name.lastIndexOf(path.extname(i.name)))} - ${path.extname(i.name).slice(1)} - ${s.size}`);
      });
    }
  });
});
