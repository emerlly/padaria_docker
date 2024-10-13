async function createPaymentTable() {
    const conn = await connection(); // Certifique-se de que 'connection' é uma função que retorna uma Promise.
    try {
        await conn.query(`USE ${databaseConfig.database}`); // Seleciona o banco de dados correto

        // Criação da tabela de pagamentos
        await conn.query(`
            CREATE TABLE IF NOT EXISTS pagamento (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                pedido_id INT NOT NULL,
                metodo VARCHAR(100) NOT NULL,
                valor DOUBLE NOT NULL,
                moeda VARCHAR(100) NOT NULL,
                FOREIGN KEY (pedido_id) REFERENCES pedido(id)
            )
        `);

        console.log("Tabela 'pagamento' criada com sucesso.");
    } catch (error) {
        console.error("Erro ao criar a tabela 'pagamento':", error);
    } finally {
        await conn.end(); // Garante que a conexão seja encerrada
    }
}
