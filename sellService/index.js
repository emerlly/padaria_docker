const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000; // Certifique-se de que esta é a mesma porta exposta no docker-compose

app.get('/sales', async (req, res) => {
  try {
    const response = await axios.get('http://service_pedidos:3000/orders');
 
    const orders = response.data;

    // Processamento dos dados
    const sales = orders.map(order => ({
      id: order.id,
      clientId: order.clientId,
      description: order.description,
      totalPrice: calculateTotal(order) // Substitua pelo seu método de cálculo
    }));

    res.status(200).json(sales);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    res.status(500).send('Erro ao buscar vendas');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
