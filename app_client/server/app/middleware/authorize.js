const {
    jwtVerify
} = require('../utils/utils');
const {
    code,
} = require('../utils/config');
let authorize = async (ctx, next) => {

    let {
        authorization
    } = ctx.request.headers;
    let cookie = ctx.cookies.get('token');
    authorization = authorization || cookie;


    if (authorization) {
        let user = await jwtVerify(authorization);

        if (!user) {
            return ctx.body = {
                code: code.NO_PERMISSION,
                message: '没有权限'
            };
        }

        await next();
        return;
    } else {
        return ctx.body = {
            code: code.NO_PERMISSION,
            message: '没有权限'
        };
    }

}

module.exports = authorize;