const fs = require('fs')

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
  // This function puts the Content in JSON format inside a file whoose name is defined and the charset is utf8
}

// This function was created after creating the function used to retrieve data from the body... it is said that it will be used to facilitate the update part... still don't understand though

function getPostData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = ''

      req.on('data', (chunk) => {
        body += chunk.toString()
      })
      req.on('end', () => {
        resolve(body)
      })
    } catch (error) {}
  })
}

module.exports = {
  writeDataToFile,
  getPostData,
}
