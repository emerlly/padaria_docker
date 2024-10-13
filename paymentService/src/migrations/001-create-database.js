const  connection =require('../config/connection');
const databaseConfig = require('../config/database');

async function createPagamentoTable() {
    const conn = await connection;
    await conn.query(`USE ${databaseConfig.database}`); // seleciona o banco de dados correto
    await conn.query(`
        CREATE  DATABASE IF NOT EXISTS ${databaseConfig.database}`,
        );
    await conn.end();
};

createPagamentoTable()
    .then(() => {
        console.log('Tabela pagamento criada com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao criar tabela pagamento:', err);
    });