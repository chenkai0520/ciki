const Router = require('@koa/router')
const signCon = require('../controler/sign')

const router = new Router();
router.put('/auth/register',signCon.register);

router.post('/auth/login', signCon.signIn);

module.exports = router