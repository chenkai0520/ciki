let utils = require("./utils");

function participleMD(md){
    if(!md) return;
    md = md.toLocaleLowerCase();
    return utils.extractChinese(md).concat(utils.extractEnglish(md));
}


module.exports = {
    participleMD
}