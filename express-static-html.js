const express = require('express');
const path = require('path');
const logger = require('morgan')
const app = express();
// log writer middleware like apache combined format
app.use(logger('combined'));
app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));
app.listen(process.argv[2] || 1337);
console.log("app start on port", process.argv[2] || 1337);
