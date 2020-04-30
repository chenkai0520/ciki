const jwt = require('jsonwebtoken');
// let nodejieba = require("nodejieba");

const {log4jser} = require('./log4js')
const {
    SIGNIN_MAXAGE,
    SALT
} = require('../utils/constants');

/**
 * 生成指定长度的随机字符串
 * @param {number} len default:16; 生成字符串的长度 
 * @returns {string} 随机字符串
 */
function getRandomStr(len = 16) {
    let datas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '_'];
    let datasLength = datas.length;

    let randomStr = '';
    for (let index = 0; index < len; index++) {
        randomStr += datas[getRandomNum(0, datasLength - 1)];
    }
    return randomStr;
}

/**
 * 生成指定长度的随机字符串(小写字母、数字)
 * @param {number} len default:32; 生成字符串的长度 
 * @returns {string} 随机字符串
 */
function getUUID(len = 32) {
    let datas = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let datasLength = datas.length;

    let randomStr = '';
    for (let index = 0; index < len; index++) {
        randomStr += datas[getRandomNum(0, datasLength - 1)];
    }
    return randomStr;
}


/**
 * 生成指定区间的，指定有效数字的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @param {number} validNumber 保留大有效数字
 * @returns {number} 随机数
 */
function getRandomNum(min, max, validNumber) {
    let randomNum = Math.random() * (max - min) + min;
    return randomNum.toFixed(validNumber)
}


/**
 * 生成jwt
 * @param {json} data 生成token的json
 * @param {string} salt 加密字符
 * @param {*} expiresIn default:7*24*60*60*1000  过期时间
 */
function jwtSign(data, salt = SALT, expiresIn = SIGNIN_MAXAGE) {
    let token = jwt.sign(data, salt, {
        expiresIn: expiresIn
    });
    return token;
}


/**
 * 解析jwt
 * @param {string} token jwt
 * @param {string} salt 加密字符
 */
async function jwtVerify(token, salt = SALT) {
    return new Promise((resolve) => {
        jwt.verify(token, salt, function (err, decoded) {
            if (err) {
                log4jser.error(err);
                resolve(null);
            }
            resolve(decoded);
        });
    })
}

/**
 * 提取字符串中的中文并分词
 * @param {string} str 
 * @returns {array}
 */
function extractChinese(str){
    if(!str || typeof str !== 'string') return [];

    let chinese = str.match(/[\u4e00-\u9fa5]/g);
    
    return chinese ? nodejieba.cut(chinese.join('')) : [];
}

/**
 * 对字符串中的字母、数字分词
 * @param {string} str 
 * @returns {array}
 */
function extractEnglish(str){
    if(!str || typeof str !== 'string') return [];

    return str.split(/[^a-zA-Z0-9]/).filter((val)=>{ return !!val });
}


module.exports = {
    getUUID,
    getRandomStr,
    getRandomNum,
    jwtSign,
    jwtVerify,
    extractChinese,
    extractEnglish
}