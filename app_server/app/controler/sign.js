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
        return ctx.body = {
            code: code.ILLEGAL_PARAMETER,
            message: error
        };
    }

    let user = await userModel.getUserByName(name);
    if (!user) {
        return ctx.body = {
            code: code.NOT_EXISTED,
            message: '用户不存在'
        };
    }

    let isRightPassword = user.password === SHA256(`${password}${user.salt}`).toString();
    if (isRightPassword) {


        let token = jwtSign({
            id: user.id,
            name: user.name,
        });

        ctx.cookies.set('token', 'token', {
            domain: 'localhost',
            maxAge: 24*3600*1000,
            httpOnly: false,
            path: '/',
            overwrite: false  // 是否允许重写
        });
        return ctx.body = {
            code: code.SUCCESS,
            data: {
                name,
                jwt: token,
            }
        };
    }

    return ctx.body = {
        code: code.ERROR,
        message: "密码错误"
    };
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
        return ctx.body = {
            code: code.ILLEGAL_PARAMETER,
            message: error
        };
    }


    let isExit = await userModel.isExit(name);
    if (isExit) {
        return ctx.body = {
            code: code.EXISTED,
            message: "用户已存在"
        };
    }


    let salt = getRandomStr(8);
    let reault = await userModel.insert(name, SHA256(`${password}${salt}`).toString(), salt);

    if (reault && reault.rowCount) {
        return ctx.body = {
            code: code.SUCCESS,
            data: {
                name
            }
        };
    }
    return ctx.body = {
        code: code.UNKNOWN_MISTAKE,
        message: "未知错误"
    };
}

module.exports = {
    signIn,
    register
};