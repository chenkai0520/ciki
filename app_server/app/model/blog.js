const db = require('../db')
const {
    getUUID
} = require('../utils/utils');
const USER_TABLE = 'public.user';
const USER_DATA_TABLE = 'public.user_data';

let create = async function (userID, blog, short, thumb) {
    let {
        content,
        tag,
        title
    } = blog;

    let uid = getUUID(32);
    let sqlAndParams = [{
            sql: `INSERT INTO ${USER_DATA_TABLE}(
                data_id, user_id, tag, title,short,thumb)
                VALUES ($1, $2, $3, $4,$5,$6);`,
            params: [uid, userID, [tag], title, short, thumb]
        },
        {
            sql: `CREATE TABLE data.b_${uid}
            (
                data text,
                update_at timestamp without time zone default now()
            )`,
        },
        {
            sql: `INSERT INTO data.b_${uid}(
                data)
                VALUES ($1);`,
            params: [content]
        }
    ]

    const result = await db.runTSQL(sqlAndParams);


    return result ? uid : null;
}

let update = async function (userID, dataUid, blog) {
    let {
        content,
        tag,
        title
    } = blog;

    let uid = getUUID(32);
    let sqlAndParams = [{
            sql: `UPDATE ${USER_DATA_TABLE}(
                SET tag=$3, title=$4)
                WHERE data_id=$1 and user_id =$2;`,
            params: [dataUid, userID, [tag], title]
        },
        {
            sql: `INSERT INTO data.b_${uid}(
                data)
                VALUES ($1);`,
            params: [content]
        }
    ]

    const result = await db.runTSQL(sqlAndParams);
    return result;
}

async function list(limit, offset, search) {

    let sql = `select * from ${USER_DATA_TABLE} limit $1 offset $2`
    const result = await db.runSQL(sql, [limit, offset]);
    if (result && result.rows) {
        return result.rows;
    }
}
module.exports = {
    create,
    update,
    list
}