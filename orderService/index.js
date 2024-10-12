const express = require('express');
const app = express();
const port = 3000;

const cors = require('cors');
const router = require('./src/routes/routes');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`servidor de pedidos rodando na porta ${port}`);
});