const SHA256 = require('crypto-js/sha256');

const {
    getRandomStr,
    jwtSign
} = require('../utils/utils');
const {
    REGEXP,
} = require('../utils/constants');
const userModel = require('../model/user');

async function signIn(ctx) {
    let {
        name,
        password
    } = ctx.request.body;

    let rule = {
        name: {
            type: 'string',
            format: REGEXP.USER_NAME
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

        return ctx.error(ctx.ERR.ILLEGAL_PARAMS, error);
    }

    let user = await userModel.getByName(name);
    if (!user) {

        return ctx.error(ctx.ERR.NOT_EXIST);
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

        return ctx.success({
            name,
            jwt: token,
        });
    }
    
    return ctx.error(ctx.ERR.ERROR, '密码错误');
}



async function register(ctx) {
    let {
        name,
        password
    } = ctx.request.body;

    let rule = {
        name: {
            type: 'string',
            format: REGEXP.USER_NAME
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

        return ctx.error(ctx.ERR.ILLEGAL_PARAMS, error);
    }


    let isExit = await userModel.isExit(name);
    if (isExit) {

        return ctx.error(ctx.ERR.EXISTED);
    }


    let salt = getRandomStr(8);
    let reault = await userModel.insert(name, SHA256(`${password}${salt}`).toString(), salt);

    if (reault && reault.rowCount) {

        return ctx.success({
            name
        });
    }

    return ctx.error(ctx.ERR.UNKNOWN_MISTAKE);
}

module.exports = {
    signIn,
    register
};