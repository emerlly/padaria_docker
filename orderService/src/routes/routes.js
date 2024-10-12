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
  const { clienteId, status, valorTotal, items } = req.body;

  // Verifica se todos os campos obrigatórios são fornecidos
  if (!clienteId || !status || !valorTotal || !items || !Array.isArray(items)) {
    return res.status(400).send('Todos os campos são obrigatórios e "items" deve ser uma lista de itens.');
  }

  try {
    const conn = await connection();
    await conn.query(`USE ${databaseConfig.database}`);

    // Insere o pedido na tabela orders
    const orderSql = `INSERT INTO pedido (clienteId, dataCriacao, status, valorTotal) VALUES (?, CURRENT_TIMESTAMP, ?, ?)`;
    const [orderResult] = await conn.query(orderSql, [clienteId, status, valorTotal]);

    const orderId = orderResult.insertId;

    // Insere os itens do pedido na tabela orderedItems
    const itemSql = `INSERT INTO pedidos_item (PedidoId, produtoId, quantidade, precoUnitario, subtotal) VALUES (?, ?, ?, ?, ?)`;

    for (const item of items) {
      const { produtoId, quantidade, precoUnitario } = item;
      const subtotal = quantidade * precoUnitario;
      await conn.query(itemSql, [orderId, produtoId, quantidade, precoUnitario, subtotal]);
    }

    res.status(201).send({ message: 'Pedido e itens cadastrados com sucesso!', orderId });

    await conn.end();
  } catch (err) {
    console.error('Erro ao criar pedido e itens:', err);
    res.status(500).send('Erro ao criar pedido e itens.');
  }
});


//busca pedido pelo id
router.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do pedido a partir dos parâmetros da URL
    const conn = await connection(); // Conexão com o banco de dados
    await conn.query(`USE ${databaseConfig.database}`); // Seleciona o banco de dados

    const sql = 'SELECT * FROM pedido WHERE id = ?';
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