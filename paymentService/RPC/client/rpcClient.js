const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Carregar o arquivo proto
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../src/payment.proto'), {});
const padariaProto = grpc.loadPackageDefinition(packageDefinition).padaria;

const client = new padariaProto.Pagamento('localhost:50052', grpc.credentials.createInsecure());

const pedido = {
    id: '1234',
    descricao: 'Pedido de exemplo',
};

const dadosPagamento = {
    metodo: 'cartao',
    valor: 100.00,
    moeda: 'BRL',
};

// Chamar o método processarPagamento
client.processarPagamento({ pedido, dadosPagamento }, (error, response) => {
    if (error) {
        console.error('Erro ao processar pagamento:', error);
    } else {
        console.log(response.mensagem);
    }
});
