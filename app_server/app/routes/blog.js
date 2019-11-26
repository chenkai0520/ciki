const Router = require('@koa/router')
const blogCon = require('../controler/blog')
const authorize = require('../middleware/authorize')

const router = new Router();
router.post('/blog', authorize, blogCon.create);
router.get('/blog/:blogUserID/list', blogCon.list);

module.exports = router;