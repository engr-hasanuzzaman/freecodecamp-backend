const http = require('http');
const  koa = require('koa');
const logger = require('koa-logger');
const path = require('path');
const serve = require('koa-static');
const app = new koa();

// setup middleware
app.use(logger());
app.use(serve(path.join(__dirname, 'public')));

// request handle
app.listen(3000);
