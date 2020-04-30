const {
    jwtVerify
} = require('../utils/utils');
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
            return ctx.error(ctx.ERR.NO_PERMISSION);
        }

        // 检查user
        let {
            name,
            id
        } = user;
        if (!id || !name) {
            return ctx.error(ctx.ERR.NO_PERMISSION);
        }

        let userRes = await userModel.getByName(name);
        if (!userRes || userRes.id !== id) {

            return ctx.error(ctx.ERR.NO_PERMISSION);
        }
        ctx.user = {
            id,
            name
        };
        await next();
    } else {
        return ctx.error(ctx.ERR.NO_PERMISSION);
    }

}

module.exports = authorize;