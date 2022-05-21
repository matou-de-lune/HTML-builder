const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const output = fs.createWriteStream(path.join(__dirname, 'output.txt'));

stdout.write('Напишите что-нибудь:\n');
stdin.on('data', data => {
  if (data.toString().slice(0, -2) === 'exit') process.exit();
  output.write(data);
});
process.on('SIGINT', () => process.exit());
process.on('exit', () => stdout.write('\nФайл записан. До новых встреч!'));
