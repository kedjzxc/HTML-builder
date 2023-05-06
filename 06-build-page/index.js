const fs = require('fs')
const path = require('path')
const folderPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'style.css');
const components = path.join(__dirname, 'components')
const extension = '.css';

fs.readdir(components, (err, files) => {
  if (err) throw err
  files.forEach(file => {
    console.log(file);
  })
})

fs.mkdir('project-dist', err => {
  if (err) throw err
  console.log('папка создана');
})

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
      console.log('style.css был создан');
    })
});

const sourceDir = path.join(__dirname, 'assets');
const destDir = path.join(__dirname, 'project-dist', 'assets');

function copyFolder(src, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dest, { recursive: true }, err => {
      if (err) return reject(err);

      fs.readdir(src, { withFileTypes: true }, (err, files) => {
        if (err) return reject(err);

        const promises = files.map(file => {
          const srcPath = path.join(src, file.name);
          const destPath = path.join(dest, file.name);

          if (file.isDirectory()) {
            return copyFolder(srcPath, destPath);
          } else if (file.isFile()) {
            return new Promise((resolve, reject) => {
              const readStream = fs.createReadStream(srcPath);
              const writeStream = fs.createWriteStream(destPath);

              readStream.on('error', reject);
              writeStream.on('error', reject);
              writeStream.on('finish', resolve);

              readStream.pipe(writeStream);
            });
          }
        });

        Promise.all(promises)
          .then(() => resolve())
          .catch(err => reject(err));
      });
    });
  });
}

copyFolder(sourceDir, destDir)
  .then(() => console.log('папка assets скопирована'))
    
  const componentsDir = path.join(__dirname, 'components');
    function replaceTag(tag, fileContents) {
    const filePath = path.join(componentsDir, `${tag}.html`);
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const result = fileContents.replace(`{{${tag}}}`, data);
          resolve(result);
        }
      });
    });
  }
    const templatePath = path.join(__dirname, 'template.html');
  fs.readFile(templatePath, 'utf8', (err, data) => {
    if (err) throw err;
      replaceTag('header', data)
      .then(result => replaceTag('articles', result))
      .then(result => replaceTag('footer', result))
      .then(result => {
        const distPath = path.join(__dirname, 'project-dist', 'index.html');
        fs.writeFile(distPath, result, err => {
          if (err) throw err;
          console.log('файл сохранен');
        });
      })
      .catch(err => console.error(err));
  });
  

