const http = require('http');
const  koa = require('koa');
const logger = require('koa-logger');
const path = require('path');
const serve = require('koa-static');
const app = new koa();

// setup middleware
app.use(logger());
app.use(serve(path.join(__dirname, 'public')));
app.use((ctx) => {
  switch (ctx.accepts('html', 'json')) {
    case 'html':
      ctx.type = 'html';
      ctx.body = '<p> Wellcome to koa application</p>';
      break;
    case 'json':
        ctx.type = 'json';
        ctx.body = { msg: 'Wellcome to koa api' };
        break;
    default:
      ctx.body = 'not found'
  }
})
// request handle
app.listen(3000);
