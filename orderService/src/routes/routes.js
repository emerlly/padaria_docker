const express = require('express');
const router = express.Router();
const connection = require('../config/conection');
const databaseConfig = require('../config/database');

router.get('/', (req, res) => {
  res.send('rota principal');
});

//busca todos os pedidos no server
router.get('/orders', async (req, res) => {
  try {
    const conn = await connection(); // Conexão com o banco de dados
    await conn.query(`USE ${databaseConfig.database}`); // Seleciona o banco de dados

    const sql = 'SELECT * FROM orders';
    const [rows] = await conn.query(sql); // Executa a query e espera pelos resultados

    res.status(200).json(rows); // Retorna os resultados em formato JSON
    await conn.end(); // Encerra a conexão com o banco de dados
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).send('Erro ao buscar pedidos');
  }
});

//cadastrar pedido
router.post('/orders', async (req, res) => {
  const { description, date, status, address } = req.body;

  if (!description || !date || !status || !address) {
    return res.status(400).send('Todos os campos são obrigatórios.');
  }

  const conn = await connection();
  await conn.query(`USE ${databaseConfig.database}`);
  const sql = `INSERT INTO orders ( description, date, status, address) VALUES ( ?, ?, ?, ?)`;
  await conn.query(sql, [description, date, status, address], (err, result) => {
    if (err) {
      console.error('Erro ao criar pedido:', err);
      res.status(500).send('Erro ao criar pedido');
    } else {
      res.status(200).send('Pedido criado com sucesso!');
    }
  });
  await conn.end();
  res.status(200).send('Pedido criado com sucesso!');
});

router.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do pedido a partir dos parâmetros da URL
    const conn = await connection(); // Conexão com o banco de dados
    await conn.query(`USE ${databaseConfig.database}`); // Seleciona o banco de dados

    const sql = 'SELECT * FROM orders WHERE id = ?';
    const [rows] = await conn.query(sql, [id]); // Executa a query com o ID fornecido

    if (rows.length === 0) {
      res.status(404).send('Pedido não encontrado'); // Retorna erro se o pedido não for encontrado
    } else {
      res.status(200).json(rows[0]); // Retorna o pedido encontrado em formato JSON
    }

    await conn.end(); // Encerra a conexão com o banco de dados
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).send('Erro ao buscar pedido');
  }
});


module.exports = router;