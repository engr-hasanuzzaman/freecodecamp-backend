const renderer = require('./lib/render');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');
const serve = require('koa-static');
const path = require('path');

const koa = require('koa');
const app = module.exports = new koa();
const APP_PORT = process.argv[2] || 3000;

const todos = [
  { title: 'First todo', content: 'First todo content', status: false },
  { title: '2nd todo', content: '2nd todo content', status: true }
];

app.use(logger());
app.use(serve(path.join(__dirname + '/public')));
app.use(koaBody());
app.use(renderer);

// declare router
router.get('/todos', todoIndex)
  .get('/', todoIndex)
  .get('/todos/new', todoNew)
  .get('/todos/:id', todoShow)
  .post('/todos', todoCreate)
      
app.use(router.routes());

/**
 * 
 */
async function todoIndex(ctx){
  await ctx.render('todos/index', { todos: todos, title: 'index' });
}

async function todoShow(ctx){
  let id = ctx.params.id;
  let todo = todos[id];
  if(!todo) ctx.throw(404, 'content not found');

  await ctx.render('todos/show', { todo: todo, title: 'show todo' });
}

async function todoNew(ctx){
  await ctx.render('todos/new', { title: 'new todo' });
}

async function todoCreate(ctx){
  console.log('---call create todo method--');
  let todo = ctx.request.body;
  todo.status = false;
  todo.created_at = new Date();
  // todo.target_completion_date = 
  todo.completed_at = null;
  todos.push(todo);
  ctx.redirect('/todos');
}

if(!module.parent){
  app.listen(APP_PORT);
  console.log('--- application runnin on port ', APP_PORT);
}