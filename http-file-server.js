const fs = require('fs')
const http = require('http')

let port = process.argv[2];
let filePath = process.argv[3];

const server = http.createServer(processServerReq);

function processServerReq(req, res) {
  let fileStm = fs.createReadStream(filePath);
  res.writeHead(200, { 'content-type': 'text/html' })
  // pipe readStream to res StreamObject
  fileStm.on('open', () => {
    fileStm.pipe(res);
  });

  fileStm.on('close', () => {
    res.end();
  })

  fileStm.on('error', (error) => {
    res.end(error);
  });
}

server.listen(port, () => {
  console.log("node server is running on port", port);
})
