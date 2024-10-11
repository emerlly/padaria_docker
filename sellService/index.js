const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001; // Porta de serviço


app.get(`/sales/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`http://pedidos_service:3000/orders/${id}`); // Use o nome do serviço
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).send('Erro ao buscar venda');
  }
});

app.get('/sales', async (req, res) => {
  try {
    const response = await axios.get('http://pedidos_service:3000/orders'); 
 
    res.status(200).json(sales);

  } catch (error) {
    if (response.data === null || response.data === undefined || response.data.length === 0) {
      res.status(404).send('Venda não encontrada');
    }else{
  
      res.status(500).send('Erro ao buscar vendas',);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de venda rodando na porta ${PORT}`);
});
