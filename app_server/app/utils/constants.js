module.exports = {
    SIGNIN_MAXAGE: 7 * 24 * 60 * 60,
    SALT: 'WE!@#WE$%^&(*&^%$RNK',
    REGEXP: {
        UID: /^[a-z0-9]{32}$/,
        AK: /^[a-zA-Z0-9]{43}$/,
        USER_NAME: /^[0-9a-zA-Z_]{6,}$/,
        USER_PASSWORD: /^\S{6,}$/,
    },

    ERR: {
        NO_AUTH: {
            code: 601,
            msg: '未通过访问认证'
        },

        NO_PERMISSION: {
            code: 602,
            msg: '没有操作权限'
        },

        NO_REQUIRED_PARAMS: {
            code: 701,
            msg: '必要参数缺失'
        },

        ILLEGAL_PARAMS: {
            code: 702,
            msg: '参数不合法'
        },

        EXISTED: {
            code: 613,
            msg: '对象已存在'
        },

        NOT_EXIST: {
            code: 801,
            msg: '对象不存在',
        },
        FAILED: {
            code: 802,
            msg: '操作失败'
        },
        UNKNOWN_MISTAKE: {
            code: 901,
            msg: '未知错误'        
        },
        ERROR: {
            code: 301,
            msg: '已知错误'     
        },
    }

}