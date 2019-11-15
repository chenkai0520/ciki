
module.exports = {
    code:{
        SUCCESS: 0,
        ILLEGAL_PARAMETER: 700,
        // 已存在
        EXISTED: 502,
        // 不存在
        NOT_EXISTED:501,
        // 未知错误
        UNKNOWN_MISTAKE:300,
        // 错误
        ERROR: 301,
        // 无权限
        NO_PERMISSION: 503,
    },
    reg:{
        userNameR: /^[0-9a-zA-Z_]{6,}$/,
        userPasswordR: /^\S{6,}$/,
    },
    SIGNIN_MAXAGE: 7 * 24 * 60 * 60,
    SALT: 'WE!@#WE$%^&(*&^%$RNK'
}