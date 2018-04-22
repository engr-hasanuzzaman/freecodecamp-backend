const renderer = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const koa = require('koa');
const app = module.exports = new koa();
const APP_PORT = process.argv[2] || 3000;

const posts = [{ title: 'First post', content: 'First post content'}];

app.use(logger());
app.use(koaBody());
app.use(renderer);

// declare router
router.get('/posts', postIndex)
  .get('/post/:id', postShow);
      
app.use(router.routes());

/**
 * 
 */
async function postIndex(ctx){
  await ctx.render('todos/index', { posts: posts });  
}

async function postShow(ctx){
  let id = ctx.params.id;
  ctx.body = posts[id];
}

if(!module.parent){
  app.listen(APP_PORT);
  console.log('--- application runnin on port ', APP_PORT);
}