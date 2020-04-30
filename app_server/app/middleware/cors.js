/**
 * 允许跨域中间件
 * @param {*} ctx 
 * @param {*} next
 */
let cros = async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', "true");
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        return ctx.body = 200;
    } else {
        await next();
    }    
}

module.exports = cros;