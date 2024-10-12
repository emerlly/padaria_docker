// src/migrations/001-create-clientes-table.js

const connection = require('../config/connection'); // ajuste o caminho conforme sua estrutura
const databaseConfig = require('../config/database'); // ajuste o caminho conforme sua estrutura

async function createClientesTable() {
    const conn = await connection();
    await conn.query(`USE ${databaseConfig.database}`); // seleciona o banco de dados correto
    await conn.query(`
        CREATE TABLE IF NOT EXISTS vendas (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            idCliente INT NOT NULL,
            produtos VARCHAR(100) NOT NULL
        );
    `);
    await conn.end();
}

createClientesTable()
    .then(() => {
        console.log('Tabela vendas criada com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao criar tabela vendas:', err);
    });
