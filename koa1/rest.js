// const http = require('http');
const koa = require('koa');
const logger = require('koa-logger');
const path = require('path');
const serve = require('koa-static');
const router = require('koa-router')();
const app = new koa();
const posts = [{ title: 'First post', content: 'This is default first post for testing purposes' }]; // database

// setup middleware
app.use(logger());
app.use(serve(path.join(__dirname, 'public')));

// foute defination
router.get('/posts', showAllPosts);

// apply routes to koa 
app.use(router.routes());

/**
 * post listing 
 */
function showAllPosts(ctx){
  ctx.type = 'json';
  ctx.body = posts;
}

// request handle
app.listen(3000);
