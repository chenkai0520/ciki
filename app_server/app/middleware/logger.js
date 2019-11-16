const {log4jser} = require('../utils/log4js')
let logger = async (ctx, next) => {
    const start = Date.now();
    await next();
    log4jser.info(`${ctx.method} ${ctx.url} - ${Date.now()-start}ms`);
}

module.exports = logger;