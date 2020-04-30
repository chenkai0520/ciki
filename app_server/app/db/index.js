const {
  Pool
} = require('pg')
const config = require('../../config')
const pool = new Pool(config.db)
const {
  log4jser
} = require('../utils/log4js')

module.exports = {
  runSQL: async (text, params) => {

    try {
      let result = await pool.query(text, params);
      return result;
    } catch (err) {
      log4jser.error(err);
      return null;
    } finally {
      log4jser.info(`sql:${text}----参数:${params}`);
    }
  },
  runTSQL: async (sqlAndParams) => {
    if (!sqlAndParams || !Array.isArray(sqlAndParams)) return;

    let isLegalSQL = sqlAndParams.every((item) => {
      return !!item.sql
    });
    if (!isLegalSQL) return;

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      for (let item of sqlAndParams) {
        await client.query(item.sql, item.params);
      }

      await client.query('COMMIT');
      return true;
    } catch (err) {
      log4jser.error(err);
      await client.query('ROLLBACK');
      return false;
    } finally {
      client.release();
      log4jser.info(`事务：${JSON.stringify(sqlAndParams)}`);
    }
  },
  getClient: async () => {
    let client;
    try {
      client = await pool.connect();
    } catch (error) {
      log4jser.error(err);
      return null;
    }
    return client;
  },
}