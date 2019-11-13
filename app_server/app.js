const Koa = require('koa');
const Router = require('@koa/router');
const KoaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser');
const RequireDirectory = require('require-directory')

const parameter = require('@c_kai/parameter');
const logger = require('./app/middleware/logger');
const config = require('./config');
const {
    log4jser
} = require('./app/utils/log4js')


const app = new Koa();

app.context.log = log4jser;
app.context.parameter = new parameter();

app.on('error', (err, ctx) => {
    ctx.log.error('server error', err, ctx);
});

// 允许跨域
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Credentials', "true");
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        return ctx.body = 200;
    } else {
        await next();
    }
});

app.use(logger);
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

// 自动注册路由
RequireDirectory(module, './app/routes', {
    visit: (route) => {
        if (route instanceof Router) {
            app.use(route.routes(), route.allowedMethods());
        }
    }
});


app.listen(config.port);

log4jser.info(`应用启动：http://localhost:${config.port}`);