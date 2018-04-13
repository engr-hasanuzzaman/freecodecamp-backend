var fs = require('fs')

file_to_read = process.argv[2]
num_of_newline = fs.readFileSync(file_to_read).toString().split('\n').length
// note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

console.log(num_of_newline - 1)
