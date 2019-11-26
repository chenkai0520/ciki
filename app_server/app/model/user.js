const db = require('../db')

const USER_TABLE = 'public.user';

let insert = async function(name,password,salt){
    let sql = `INSERT INTO ${USER_TABLE}(
        name, password, salt)
        VALUES ($1, $2, $3);`
    const result = await db.runSQL(sql, [name,password,salt]);
    return result;
}

let isExit = async function(name){
    let sql = `select * from ${USER_TABLE} where name = $1`
    const result = await db.runSQL(sql, [name]);

    if(result && result.rowCount === 1){
        return true;
    }
    return false;
}

let getByName = async function(name){
    let sql = `select * from ${USER_TABLE} where name = $1`
    const result = await db.runSQL(sql, [name]);

    if(result && result.rows){
        return result.rows[0];
    }
}

let getByID = async function(id){
    let sql = `select * from ${USER_TABLE} where id = $1`
    const result = await db.runSQL(sql, [id]);

    if(result && result.rows){
        return result.rows[0];
    }
}

module.exports = {
    insert,
    isExit,
    getByName,
    getByID
}