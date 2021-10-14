var Koa = require('koa');
var Router = require('koa-router');
const koaBody = require('koa-body');
var app = new Koa();
var router = new Router();
app.use(koaBody({
  multipart: true
}));
router.get('/',ctx=>{
  console.log(ctx.request.url)
  ctx.response.body = 1
})
router.get('/index',ctx=>{
  console.log(ctx.request.url)
  ctx.body = 'index'
})
router.post('/user',ctx => {
  console.log('user',ctx.request.body)
  ctx.body = 'user'
})
app.use(router.routes()).use(router.allowedMethods());


app.listen(4000,()=>{
  console.log('listen 4000')
})