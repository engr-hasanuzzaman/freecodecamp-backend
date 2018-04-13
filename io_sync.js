var fs = require('fs')

file_to_read = process.argv[2]
fs.readFile(file_to_read, 'utf8', (error, data) => {
  if(error){
    return console.error("there is an error during file read", error)
  }

  console.log(data.split('\n').length - 1)
})
