const axios = require('axios');

describe('Teste de busca de produto por ID', () => {
    it('Deve retornar um produto pelo ID', async () => {
        const response = await axios.get('http://localhost:3000/orders/2');

        expect(response.status).toBe(200);
        expect(response.data).toHaveProperty('id', 2);
        expect(response.data).toHaveProperty('status', 'pendente');
        expect(response.data).toHaveProperty('valorTotal', '120.00'); 
    });

    it('Deve retornar 404 para um produto que não existe', async () => {
        const response = await axios.get('http://localhost:3000/orders/9999').catch(e => e.response);
    
        // Verifica se o status da resposta é 404 (não encontrado)
        expect(response.status).toBe(404);
    
        // Verifica se a mensagem de erro está presente no corpo da resposta
        expect(response.data).toBe('Pedido não encontrado');
    });
    
});
