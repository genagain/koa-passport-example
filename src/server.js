const next = require('next');
const Koa = require('koa');
const Router = require('@koa/router')
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const fs = require('fs');
const createRouter = require('./routes')
require('./auth');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const server = new Koa();
const router = createRouter(app)

app.prepare().then(() => {

  // sessions
  server.keys = ['super-secret-key'];
  server.use(session(server));

  // body parser
  server.use(bodyParser());

  // authentication
  server.use(passport.initialize());
  server.use(passport.session());

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  // server
  server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
})
