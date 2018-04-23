const renderer = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const koa = require('koa');
const app = module.exports = new koa();
const APP_PORT = process.argv[2] || 3000;

const todos = [
  { title: 'First todo', content: 'First todo content', status: false },
  { title: '2nd todo', content: '2nd todo content', status: true }
];

app.use(logger());
app.use(koaBody());
app.use(renderer);

// declare router
router.get('/todos', todoIndex)
  .get('/todos/:id', todoShow)
  .get('/todos/new', todoNew)
      
app.use(router.routes());

/**
 * 
 */
async function todoIndex(ctx){
  await ctx.render('todos/index', { todos: todos });
}

async function todoShow(ctx){
  let id = ctx.params.id;
  let todo = todos[id];
  if(!todo) ctx.throw(404, 'content not found');
  
  await ctx.render('todos/show', { todo: todo });
}

async function todoNew(ctx){
  await ctx.render('todos/new');
}

if(!module.parent){
  app.listen(APP_PORT);
  console.log('--- application runnin on port ', APP_PORT);
}