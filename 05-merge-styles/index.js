const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');
const extension = '.css';

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  const cssFiles = files.filter((file) => path.extname(file) === extension);
  const promises = cssFiles.map(file => {
    const filePath = path.join(folderPath, file)
    return fs.promises.readFile(filePath, 'utf8')
  })

  Promise.all(promises)
    .then(arr => {
      const outputData = arr.join('')
      return fs.promises.writeFile(destPath, outputData, 'utf8')
    })
    .then(() => {
      console.log('bundle.css был создан');
    })
});
