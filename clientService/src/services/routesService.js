const express = require('express');
const app = express();
const jayson = require('jayson');

const connection = require('../config/connection');
const conn = connection;

const server = new jayson.Server({
  vender: async (args, callback) => {
    const { idCliente, produtos } = args;
    
    try {
      const { rows: cliente } = await conn.query('SELECT * FROM clientes WHERE id = $1', [idCliente]);

      if (cliente.length === 0) {
        return callback({ code: -1, message: 'Cliente não encontrado' });
      }

      const { rows: venda } = await conn.query('INSERT INTO vendas (idCliente, produtos) VALUES ($1, $2) RETURNING id', [idCliente, produtos]);
      callback(null, { idVenda: venda[0].id, cliente: cliente[0].nome });
    } catch (error) {
      console.error('Erro ao registrar venda:', error);
      callback({ code: -1, message: 'Erro ao registrar venda' });
    } finally {
      conn.end(); // Fechar a conexão após uso
    }
  },
  registrarCliente: async (args, callback) => {
    const { nome, email, telefone, endereco } = args;
    
    try {
      const { rows: [cliente] } = await conn.query('INSERT INTO clientes (nome, email, telefone, endereco) VALUES ($1, $2, $3, $4) RETURNING id', [nome, email, telefone, endereco]);
      callback(null, { id: cliente.id });
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
      callback({ code: -1, message: 'Erro ao registrar cliente' });
    } finally {
      conn.end(); // Fechar a conexão após uso
    }
  },
});

app.use(server.middleware());

app.post('/vender', async (req, res) => {
  const { idCliente, produtos } = req.body;

  try {
    const { rows: [cliente] } = await conn.query('SELECT * FROM clientes WHERE id = $1', [idCliente]);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    const { rows: [venda] } = await conn.query('INSERT INTO vendas (idCliente, produtos) VALUES ($1, $2) RETURNING id', [idCliente, produtos]);
    res.status(201).json({ idVenda: venda.id, cliente: cliente.nome });
  } catch (error) {
    console.error('Erro ao registrar venda:', error);
    res.status(500).json({ error: 'Erro ao registrar venda' });
  }
});


module.exports = app;