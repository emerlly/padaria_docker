const express = require('express');
const app = express();

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