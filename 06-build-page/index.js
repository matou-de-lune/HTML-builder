const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, 'project-dist'), { force: true, recursive: true }, (err) => {
  if (err) throw err;
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
    if (err) throw err;
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, (err) => {
      if (err) throw err;
      copyFiles('assets', path.join('project-dist', 'assets'));
    });

    const outputCss = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
    fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, items) => {
      if (err) throw err;
      items.forEach((i) => {
        if (i.isFile() && (path.extname(i.name) === '.css')) {
          fs.readFile(path.join(__dirname, 'styles', i.name), (err, data) => {
            if (err) throw err;
            outputCss.write(`\n${data}`);
          });
        }
      });
    });

    const outputHtml = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
    fs.readFile(path.join(__dirname, 'template.html'), 'utf8', (err, data) => {
      if (err) throw err;
      replaceData(data, path.join(__dirname, 'components')).then((d) => outputHtml.write(d));
    });
  });
});

function copyFiles(fromPath, toPath) {
  fs.readdir(path.join(__dirname, fromPath), { withFileTypes: true }, (err, items) => {
    if (err) throw err;
    items.forEach((i) => {
      if (i.isFile()) {
        fs.copyFile(path.join(__dirname, fromPath, i.name), path.join(__dirname, toPath, i.name), (err) => {
          if (err) throw err;
        });
      } else {
        fs.mkdir(path.join(__dirname, toPath, i.name), { recursive: true }, (err) => {
          if (err) throw err;
          copyFiles(path.join(fromPath, i.name), path.join(toPath, i.name));
        });
      }
    });
  });
}

async function replaceData(data, pathFiles) {
  const items = await fs.promises.readdir(pathFiles, { withFileTypes: true });
  for (const i of items) {
    if (i.isFile() && (path.extname(i.name) === '.html')) {
      const filedata = await fs.promises.readFile(path.join(pathFiles, i.name), 'utf8');
      data = data.replace(`{{${i.name.slice(0, -5)}}}`, filedata);
    }
  }
  return data;
}