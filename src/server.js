const next = require('next');
const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const mainRoutes = require('./routes');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
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
  server.use(mainRoutes.routes());

  // server
  server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  });
})
