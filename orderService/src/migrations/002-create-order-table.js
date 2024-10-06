const mysql = require('mysql2/promise');
const databaseConfig = require('../config/database');

async function CreateTableOrder(){
    try {
        const connection = await mysql.createConnection(databaseConfig);

        await connection.query(`USE ${databaseConfig.database}`);
        await connection.query(`
            CREATE TABLE IF NOT EXISTS order(
                id INT NOT NULL AUTO_INCREMENT,
                description VARCHAR(255) NOT NULL,
                date DATE NOT NULL,
                status VARCHAR(25) NOT NULL,
                address VARCHAR(255) NOT NULL,
                PRIMARY KEY(id)
            )
        `);
        await connection.end();
        console.log('Table created');
        
    } catch (error) {
        console.log('Error on creating the table order', error);
        
    }
}