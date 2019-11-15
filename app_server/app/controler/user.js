const {
    code,
} = require('../utils/config');
const userModel = require('../model/user');

async function info(ctx, next) {

    if (!ctx.user || !ctx.user.name) {
        return ctx.body = ctx.error(code.NOT_EXISTED, '用户不存在');
    }

    let result = await userModel.getByName(ctx.user.name);
    if (!result) {
        return ctx.body = ctx.error(code.NOT_EXISTED, '用户不存在');
    }

    return ctx.body = ctx.ok(code.SUCCESS, {
        id: result.id,
        name: result.name,
        avatar: result.avatar,
    });
}


module.exports = {
    info,
};