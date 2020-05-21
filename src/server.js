const Koa = require('koa');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const mainRoutes = require('./routes');

const server = new Koa();
const port = process.env.PORT || 3000;

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
