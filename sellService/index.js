const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001; // Porta de serviço


app.get(`/sales/:id`, async (req, res) => {
  const id = req.params.id;
  try {
    const response = await axios.get(`http://pedidos_service:3000/orders/${id}`);
    if (!response.data || response.data.length === 0) {
      return res.status(404).json({ message: 'Nenhuma venda encontrada' });
    }
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar vendas:');
    return res.status(500).json({ message: 'Erro ao buscar vendas' });
  }
});

app.get('/sales', async (req, res) => {

  const response = await axios.get('http://pedidos_service:3000/orders');

  res.status(200).json(sales);
  if (response == []) {
    res.status(404).send('Venda não encontrada', response.data);
  } else {
    res.status(404).send('Erro ao buscar vendas', response);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de venda rodando na porta ${PORT}`);
});
