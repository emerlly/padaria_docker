const mysql = require('mysql2/promise');
const databaseConfig = require('../config/database');

async function CreateTableOrder() {
    try {
        const connection = await mysql.createConnection({
            host: databaseConfig.host,
            user: databaseConfig.user,
            password: databaseConfig.password,
        });

        console.log('Database connected');
        await connection.query(`USE ${databaseConfig.database}`);
        console.log('Using database', databaseConfig.database);
        await connection.query(`
        CREATE TABLE IF NOT EXISTS orders(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            description VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            status VARCHAR(25) NOT NULL,
            address VARCHAR(255) NOT NULL
);
        `);
        await connection.end();
        console.log('Table created');

    } catch (error) {
        console.log('Error on creating the table order', error);

    }
}
CreateTableOrder();