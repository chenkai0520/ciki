const db = require('../db')


let ttest = async function(){
    let sqlParames = [
        {
            sql: `SELECT pg_sleep(3)`
        },
        {
            sql: `select pg_sleep(4)`,
        }
    ]
    const result = await db.runTSQL(sqlParames);
    return result;
}

let insert = async function(name,password,salt){
    let sql = `INSERT INTO public."user"(
        name, password, salt)
        VALUES ($1, $2, $3);`
    const result = await db.runSQL(sql, [name,password,salt]);
    return result;
}

let isExit = async function(name){
    let sql = `select * from public."user" where name = $1`
    const result = await db.runSQL(sql, [name]);

    if(result && result.rowCount === 1){
        return true;
    }
    return false;
}

let getUserByName = async function(name){
    let sql = `select * from public."user" where name = $1`
    const result = await db.runSQL(sql, [name]);

    if(result && result.rows){
        return result.rows[0];
    }
}

module.exports = {
    insert,
    isExit,
    getUserByName
}