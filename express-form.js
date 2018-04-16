var express = require('express');
var bodyparser = require('body-parser');
var http = require('http');
var path = require('path');
var pug = require('pug');
var morgan = require('morgan');
var stylus = require('stylus');

const app = express(); // response handler
// view setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(stylus.middleware(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/css')));

app.use(morgan());
app.use(bodyparser.urlencoded({extened: false}));
app.get('/form', (req, res) =>{
    res.render('form', {});
});

app.get('/index.html', (req, res) => {
    res.render('index', {});
})

// handle form submission
app.post('*', (req, res) => {
  res.end(req.body.str.split('').reverse().join(''));
});

app.put('/message/:id', (req, res) => {
  let id = req.params.id;
  res.end( require('crypto')
      .createHash('sha1')
      .update(new Date().toDateString() + id)
      .digest('hex')
    );
});

let port = (process.argv[2] || 3000);
http.createServer(app).listen(port);
console.log('server start on port: ', port);
