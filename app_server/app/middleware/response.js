/**
 * 封装返回结果中间件
 * @param {*} ctx 
 * @param {*} next
 */
let response = async (ctx, next) => {
    ctx.success = (data) => {
        return ctx.response.body = {
            code: 0,
            data: data
        };
    };
    
    ctx.error = (err = {}, tip) => {
        let { code, msg } = err;
        return ctx.response.body = {
            code: code && Number.isInteger(code) ? code : 500,
            msg: tip || msg || '服务器错误'
        };
    };

    await next();     
}

module.exports = response;