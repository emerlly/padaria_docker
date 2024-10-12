const express = require('express');
const app = express();
const jayson = require('jayson');

const connection = require('../config/connection');
const conn = connection;

const server = new jayson.Server({
  vender: async (args, callback) => {
    const { idCliente, produtos } = args;

    try {
      // Busca o cliente no banco de dados
      const [cliente] = await conn.query('SELECT * FROM clientes WHERE id = ?', [idCliente]);
      
      if (!cliente || cliente.length === 0) {
        return callback({ code: -1, message: 'Cliente não encontrado' });
      }

      // Insere a nova venda no banco de dados
      const result = await conn.query('INSERT INTO vendas (idCliente, produtos) VALUES (?, ?)', [idCliente, produtos]);

      // Retorna os detalhes da venda recém-criada
      return callback(null, { idVenda: result.insertId, cliente: cliente[0].nome });
    } catch (error) {
      console.error('Erro ao registrar venda:', error);
      return callback({ code: -2, message: 'Erro ao registrar venda no banco de dados' });
    } finally {
      // Garante que a conexão com o banco de dados será fechada
      await conn.end();
    }
  },
  registrarCliente: async (args, callback) => {
    const { nome, email, endereco, telefone } = args;

    try {
      // Insere o novo cliente no banco de dados
      const result = await conn.query('INSERT INTO clientes (nome, email, endereco, telefone) VALUES (?, ?, ?, ?)', [nome, email, endereco, telefone]);

      // Retorna os detalhes do novo cliente
      return callback(null, { id: result.insertId, nome, email, endereco, telefone });
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
      return callback({ code: -2, message: 'Erro ao registrar cliente no banco de dados' });
    } finally {
      // Garante que a conexão com o banco de dados seja fechada
      await conn.end();
    }
  },
});

app.use(server.middleware());

app.post('/vender', async (req, res) => {
  const { idCliente, produtos } = req.body;

  const client = jayson.client.http({
    port: 3000,
  });

  client.request('sell/vender', { idCliente, produtos }, (err, response) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(response.result);
    }
  });
});

module.exports = app;