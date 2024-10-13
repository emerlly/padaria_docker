const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001; // Porta de serviço


app.get(`/sales/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    const response = await axios.get(`http://pedidos_service:3000/orders/${id}`);

    return res.status(200).json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Se o serviço de pedidos retornar 404, também retornamos 404 aqui
      return res.status(404).json({ message: 'Nenhuma venda encontrada' });
    }

    console.error('Erro ao buscar a venda:', error.message);
    return res.status(500).json({ message: 'Erro ao processar a solicitação' });
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
