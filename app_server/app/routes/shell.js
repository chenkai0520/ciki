const Router = require('@koa/router')
const exec = require('../utils/exec')
const authorize = require('../middleware/authorize')


const router = new Router()

router.get('/shell', authorize, async (ctx, next) => {
    let {
        data
    } = ctx.request.query;
    if (!data) {
        return ctx.body = '404';
    }
    let result = await exec.run(data);

    ctx.body = result;
});

module.exports = router