module.exports = {
    port: 3001,
    db: {
        host: 'localhost',
        port: 5432,
    	database: 'g-default',
    	user: 'projx',
    	password: 'sss',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
}