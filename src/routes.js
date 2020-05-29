const Router = require('@koa/router');
const passport = require('koa-passport');
const fs = require('fs');

const createRouter = (app) => {

  const router = new Router();
  const handler = app.getRequestHandler()

  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/app',
      failureRedirect: '/'
    })
  )

  router.get('/logout', async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout()
      ctx.redirect('/');
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  })

  router.get('/app', async (ctx) => {
    if (ctx.isAuthenticated()) {
      await app.render(ctx.req, ctx.res, "/app", ctx.query);
      ctx.respond = false;
    } else {
      ctx.body = { success: false };
      ctx.throw(401);
    }
  })

  router.all('*', async (ctx) => {
    await handler(ctx.req, ctx.res)
    ctx.respond = false
  })

  return router;
}

module.exports = createRouter;
