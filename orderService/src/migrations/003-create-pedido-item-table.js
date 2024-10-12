const mysql = require('mysql2/promise');
const databaseConfig = require('../config/database');

async function CreateTablePedidoItem() {
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
        CREATE TABLE IF NOT EXISTS pedidos_item (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            pedidoId INT NOT NULL,
            produtoId INT NOT NULL,
            quantidade INT NOT NULL,
            precoUnitario DECIMAL(10, 2) NOT NULL,
            subtotal DECIMAL(10, 2),
            FOREIGN KEY (pedidoID) REFERENCES orders(id)
    );
        `);
        await connection.end();
        console.log('Table created');

    } catch (error) {
        console.log('Error on creating the table order', error);

    }
}
CreateTablePedidoItem();