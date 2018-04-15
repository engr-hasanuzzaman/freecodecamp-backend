const fs = require('fs')
const http = require('http')
const concat = require('concat-stream')
var map = require('through2-map')  


const PORT = process.argv[2]
const server = http.createServer(reqHandler)

function reqHandler(req, res) {
  console.log("your request is ", req.method);
  if(req.method !== 'POST'){
    res.writeHead(500, { 'content-type': 'text/plain' });
    return res.end('only post request is acceptable');
  }

  // solution using through2-map that run map on stream
  // req.pipe(map(function (chunk) {  
  //   return chunk.toString().toUpperCase(); 
  // })).pipe(res);  
  
  let data = '';
  // collect all data
  req.on('data', (chunk) => {
    data += chunk;
  })

  // send response
  req.on('end', () => {
    res.end(data.toUpperCase());
  })
}


server.listen(PORT, () => {
  console.log("node server has been started on port ", PORT);
})