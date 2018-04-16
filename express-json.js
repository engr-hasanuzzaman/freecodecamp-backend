var express = require('express');
var morgan = require('morgan');
var http = require('http');
var fs = require('fs');

const app = express(); // response handler
let filePath = process.argv[3];
// view setup
app.use(morgan());

app.get('/books', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if(err)
      return res.sendStatus(500);
    try {
      books = JSON.parse(data);
    } catch (e) {
      return res.sendStatus(500);
    }
    res.json(data);
  })
})
let port = (process.argv[2] || 3000);
http.createServer(app).listen(port);
console.log('server start on port: ', port);
