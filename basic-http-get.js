var http = require('http')
const concat = require('concat-stream')

let url = process.argv[2]

http.get(url, (res) => {
  res.setEncoding('utf8')
  contents = ''
  res.on("data", (data) => {
    contents += data
  })
  res.pipe(concat((data) => {
    console.log(data.length);
    console.log(data);
  }))
  res.on("error", (error) => {
    console.error(error);
  })
  res.on('end', (data) => {
    // console.log(contents.length);
    // console.log(contents);
  })
}).on('error', console.error)
