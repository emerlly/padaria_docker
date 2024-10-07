const mysql = require('mysql2/promise');
const databaseConfig = require('../config/database');
async function connection() {
    const connection = await mysql.createConnection({
        database: databaseConfig.database,
        host: databaseConfig.host,
        user: databaseConfig.user,
        password: databaseConfig.password,
    });
    return connection
}

module.exports = connection;