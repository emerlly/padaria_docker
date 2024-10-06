const express = require('express');
const port = 3000;
const host = '0.0.0.0';
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('teste de serviço!');

});

app.get('/orders', (req, res) => {
    res.send('teste!');

});



app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});