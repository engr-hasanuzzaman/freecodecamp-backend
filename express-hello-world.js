const app = require('express')();

app.get('/home', (req, res) => {
  res.end("Hello World!");
})

app.listen(process.argv[2]);
