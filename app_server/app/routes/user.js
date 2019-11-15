const Router = require('@koa/router')
const userCon = require('../controler/user')
const authorize = require('../middleware/authorize')

const router = new Router();
router.get('/user/info', authorize, userCon.info);


module.exports = router;