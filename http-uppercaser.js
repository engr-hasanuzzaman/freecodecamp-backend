const fs = require('fs')
const http = require('http')
const concat = require('concat-stream')

const server = http.createServer(reqHandler)

function reqHandler(req, res) {
  if(req.method === !'post')
    return res.end('only post request is acceptable')
}
