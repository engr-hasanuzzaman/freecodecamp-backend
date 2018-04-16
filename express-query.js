var express = require('express');
var morgan = require('morgan');
var http = require('http');

const app = express(); // response handler
// view setup
app.use(morgan());

app.get('/search', (req, res) => {
  res.send(req.query);
})
let port = (process.argv[2] || 3000);
http.createServer(app).listen(port);
console.log('server start on port: ', port);
