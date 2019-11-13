
let authorize = async (ctx, next) => {
    console.log('token:',ctx.cookies.get('token'));
    const cookie = ctx.request.headers.cookie;
    console.log(cookie);
    await next();
}

module.exports = authorize;