const Koa = require('koa')
const serve = require('koa-static');

const logger = require('./app/middleware/logger');
// const authorize = require('./app/middleware/authorize');

const {log4jser} = require('./app/utils/log4js')
const {
    port
} = require('./config')

const app = new Koa();

app.on('error', (err, ctx) => {
    log4jser.info('server error', err, ctx);
});

// 日志
app.use(logger);
// app.use(authorize);


// 静态文件服务
app.use(serve(__dirname + '/public'));



app.listen(port);
console.log(`http://localhost:${port}`);