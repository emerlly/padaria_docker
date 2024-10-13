const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');


// Carregar o arquivo proto
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../src/payment.proto'), {});
const padariaProto = grpc.loadPackageDefinition(packageDefinition).padaria;

const server = new grpc.Server();

// Função para processar o pagamento
async function processarPagamento(call, callback) {
    const { pedido, dadosPagamento } = call.request;

    try {
        // Aqui você pode implementar a lógica de validação e confirmação do pagamento
        console.log(`Processando pagamento para o pedido: ${pedido.id}`);
        console.log(`Método: ${dadosPagamento.metodo}, Valor: ${dadosPagamento.valor}, Moeda: ${dadosPagamento.moeda}`);

        // Simulando um processamento de pagamento
        if (dadosPagamento.valor > 0) {
            callback(null, { mensagem: 'Pagamento processado com sucesso!', sucesso: true });
        } else {
            callback(null, { mensagem: 'Valor do pagamento inválido!', sucesso: false });
        }
    } catch (error) {
        console.error('Erro ao processar pagamento:', error);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Erro ao processar pagamento',
        });
    }
}

// Adicionar serviço ao servidor
server.addService(padariaProto.Pagamento.service, {
    processarPagamento: processarPagamento,
});

// Iniciar o servidor
server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error('Erro ao iniciar o servidor:', error);
        return;
    }
    console.log(`Servidor gRPC de pagamento rodando na porta ${port}`);
    server.start();
});
