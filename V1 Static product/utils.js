const fs = require('fs')

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8')
  // This function puts the Content in JSON format inside a file whoose name is defined and the charset is utf8
}

module.exports = {
  writeDataToFile,
}
