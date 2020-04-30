const userModel = require('../model/user');

async function info(ctx) {

    if (!ctx.user || !ctx.user.name) {
        return ctx.error(ctx.ERR.NOT_EXIST);
    }

    let result = await userModel.getByName(ctx.user.name);
    if (!result) {
        return ctx.error(ctx.ERR.NOT_EXIST);
    }

    return ctx.success({
        id: result.id,
        name: result.name,
        avatar: result.avatar,
    });
}


module.exports = {
    info,
};