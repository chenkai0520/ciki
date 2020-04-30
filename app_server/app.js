const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const RequireDirectory = require('require-directory')

const parameter = require('@c_kai/parameter');
const logger = require('./app/middleware/logger');
const cors = require('./app/middleware/cors');
const response = require('./app/middleware/response');
const config = require('./config');
const {ERR} = require('./app/utils/constants');

const {
    log4jser
} = require('./app/utils/log4js')


const app = new Koa();

app.context.ERR = ERR;
app.context.parameter = new parameter();

// app.context.ok = (code, data) => {
//     console.log('this:',this)

//     return{
//         code,
//         data
//     };
// };
// app.context.error = (code, message) => {
//     return{
//         code,
//         message
//     };
// }


app.on('error', (err, ctx) => {
    log4jser.error('server error', err, ctx);
});

app.use(cors);
app.use(response);
app.use(logger);
app.use(bodyParser());

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