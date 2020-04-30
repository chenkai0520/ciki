module.exports = {
    port: 3001,
    db: {
        host: 'localhost',
        port: 6667,
    	database: 'g-default',
    	user: 'chenkai',
    	password: 'chenkai',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    }
}