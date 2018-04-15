const express = require('express');
const pug = require('pug');
const logger = require('morgan');
const path = require('path');
const app = express();
// set view path
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger()); // morgan for logging

app.get('/home', (req, res) => {
  res.render('index', { date: new Date().toDateString() });
})
const PORT = (process.argv[2] || 3000);
app.listen(PORT);
console.log("app started on port ", PORT);
