const {
    exec
} = require('child_process')

const {log4jser} = require('./log4js')


async function run(command) {

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                log4jser.error(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}
module.exports = {
    run
}