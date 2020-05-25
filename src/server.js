const next = require('next');
const Koa = require('koa');
const Router = require('@koa/router')
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  // sessions
  server.keys = ['super-secret-key'];
  server.use(session(server));

  // body parser
  server.use(bodyParser());

  // authentication
  require('./auth');
  server.use(passport.initialize());
  server.use(passport.session());

  // routes
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });

  // server
  server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
})
