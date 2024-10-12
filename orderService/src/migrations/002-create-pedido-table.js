const mysql = require('mysql2/promise');
const databaseConfig = require('../config/database');

async function CreateTablePedido() {
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
        CREATE TABLE IF NOT EXISTS pedido (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            clienteId INT NOT NULL,
            dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(50) NOT NULL,
            valorTotal DECIMAL(10, 2)
    );
        `);
        await connection.end();
        console.log('Table created');

    } catch (error) {
        console.log('Error on creating the table order', error);

    }
}
CreateTablePedido();