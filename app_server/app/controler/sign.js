const SHA256 = require('crypto-js/sha256');

const {
    getRandomStr,
    jwtSign
} = require('../utils/utils');
const {
    code,
    reg,
} = require('../utils/config');
const userModel = require('../model/user');

async function signIn(ctx, next) {
    let {
        name,
        password
    } = ctx.request.body;

    let rule = {
        name: {
            type: 'string',
            format: reg.userNameR
        },
        password: {
            type: 'string',
        }
    }
    let data = {
        name,
        password
    }
    let error = ctx.parameter.validate(rule, data);
    if (error) {

        return ctx.body = ctx.error(code.ILLEGAL_PARAMETER, error);
    }

    let user = await userModel.getByName(name);
    if (!user) {

        return ctx.body = ctx.error(code.NOT_EXISTED, '用户不存在');
    }

    let isRightPassword = user.password === SHA256(`${password}${user.salt}`).toString();
    if (isRightPassword) {


        let token = jwtSign({
            id: user.id,
            name: user.name,
        });

        ctx.cookies.set('token', 'token', {
            domain: 'localhost',
            maxAge: 24 * 3600 * 1000,
            httpOnly: false,
            path: '/',
            overwrite: false // 是否允许重写
        });

        return ctx.body = ctx.ok(code.SUCCESS, {
            name,
            jwt: token,
        });
    }
    
    return ctx.body = ctx.error(code.ERROR, '密码错误');
}



async function register(ctx, next) {
    let {
        name,
        password
    } = ctx.request.body;

    let rule = {
        name: {
            type: 'string',
            format: reg.userNameR
        },
        password: {
            type: 'string',
        }
    }
    let data = {
        name,
        password
    }
    let error = ctx.parameter.validate(rule, data);
    if (error) {

        return ctx.body = ctx.error(code.ILLEGAL_PARAMETER, error);
    }


    let isExit = await userModel.isExit(name);
    if (isExit) {

        return ctx.body = ctx.error(code.EXISTED, '用户已存在');
    }


    let salt = getRandomStr(8);
    let reault = await userModel.insert(name, SHA256(`${password}${salt}`).toString(), salt);

    if (reault && reault.rowCount) {

        return ctx.body = ctx.ok(code.SUCCESS, {
            name
        });
    }

    return ctx.body = ctx.error(code.UNKNOWN_MISTAKE, '未知错误');
}

module.exports = {
    signIn,
    register
};