const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'files');
const copyFolderPath = path.join(__dirname, 'files-copy');

function copyFiles() {
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      fs.copyFile(path.join(folderPath, file), path.join(copyFolderPath, file), err => {
        if (err) throw err;
      });
    });
    console.log(`В папке находятся файлы: ${files}`);
  });
}

fs.mkdir(copyFolderPath, { recursive: true }, err => {
  if (err) throw err;
  console.log('Папка создана');
  copyFiles();
});

fs.watch(folderPath, { recursive: true }, (_, filename) => {
  console.log(`Файл ${filename} был изменен`);
  copyFiles();
});
