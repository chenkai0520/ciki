const log4js = require('log4js');

log4js.configure({
    appenders: {
        everything: {
            type: 'file',
            filename: './logs/all-the-logs.log',
            maxLogSize: 102400,
            backups: 5,
            compress: true
        },
        out: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['everything', 'out'],
            level: 'all'
        }
    }
});

const log4jser = log4js.getLogger('default');

module.exports = {
    log4jser
}