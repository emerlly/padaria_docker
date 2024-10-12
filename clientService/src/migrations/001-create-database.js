// src/migrations/001-create-clientes-table.js

const connection = require('../database/connection'); // ajuste o caminho conforme sua estrutura
const databaseConfig = require('../config/database'); // ajuste o caminho conforme sua estrutura

async function createClientesTable() {
    const conn = await connection();
    await conn.query(`USE ${databaseConfig.database}`); // seleciona o banco de dados correto
    await conn.query(`
        CREATE  DATABASE IF NOT EXISTS ${databaseConfig.database};
    `);
    await conn.end();
}

createClientesTable()
    .then(() => {
        console.log('Tabela clientes criada com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao criar tabela clientes:', err);
    });
