const {
    jwtVerify
} = require('../utils/utils');
const {
    code,
} = require('../utils/config');
const userModel = require('../model/user');

let authorize = async (ctx, next) => {

    let {
        authorization
    } = ctx.request.headers;
    let cookie = ctx.cookies.get('token');
    authorization = authorization || cookie;


    if (authorization) {
        let user = await jwtVerify(authorization);

        if (!user) {
            return ctx.body = ctx.error(code.NO_PERMISSION, '没有权限');
        }

        // 检查user
        let {
            name,
            id
        } = user;
        if (!id || !name) {
            return ctx.body = ctx.error(code.NO_PERMISSION, '没有权限');
        }

        let userRes = await userModel.getByName(name);
        if (!userRes || userRes.id !== id) {

            return ctx.body = ctx.error(code.NO_PERMISSION, '没有权限');
        }
        ctx.user = {
            id,
            name
        };
        await next();
        return;
    } else {

        return ctx.body = ctx.error(code.NO_PERMISSION, '没有权限');
    }

}

module.exports = authorize;