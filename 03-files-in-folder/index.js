const fs = require('fs')
const path = require('path')
const { readdir } = fs
const folderPath = path.join(__dirname, 'secret-folder')

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(err);
  }
  files.forEach(file => {
    const filePath = path.join(folderPath, file)
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.log(err);
        return
      }

      if (stats.isFile()) {
        const fileSize = stats.size
        const fileExtension = path.extname(file)
        const fileName = path.basename(file, fileExtension)

        console.log(`${fileName} - ${fileExtension.slice(1)} - ${fileSize}`);
      }
    })
  })
})
