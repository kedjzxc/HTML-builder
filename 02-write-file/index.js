const fs = require('fs');
const readline = require('readline');
const path = require('path')
const filePath = path.resolve(__dirname, 'text.txt')


fs.writeFile(filePath,'', (err) => {
  if (err) throw err;
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Введите текст: ', (data) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) throw err;
      console.log('файл создан');
      rl.close();
    });
  });
});
