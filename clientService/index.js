const express = require('express');
const app = express();
const port = 8081;

const routesService = require('./src/services/routesService');
const clientService = require('./src/services/clientService');

app.use('/sell', routesService);
app.use('/client', clientService);

app.listen(port, () => {
  console.log(`Servidor de clientes RPCrodando na porta ${port}`);
});