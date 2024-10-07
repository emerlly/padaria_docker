const express = require('express');
const app = express();
const port = 3000;
const host = '0.0.0.0';
const cors = require('cors');
const router = require('./src/routes/routes');
const errorHandler = require('./src/errors/errors');

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});