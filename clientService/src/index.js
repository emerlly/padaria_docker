const express = require('express');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

// Carregar o arquivo .proto
const PROTO_PATH = __dirname + '/cliente.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const clienteProto = grpc.loadPackageDefinition(packageDefinition).cliente;

// Inicializar o servidor Express
const app = express();
app.use(express.json());

// Criar um cliente gRPC
const clienteService = {
    registrarCliente: (call, callback) => {
        // Lógica para registrar um cliente
        const cliente = call.request;
        // Suponha que o cliente é salvo em um banco de dados
        callback(null, { message: 'Cliente registrado com sucesso!' });
    },
    consultarCliente: (call, callback) => {
        const id = call.request.id;
        // Lógica para consultar o cliente
        // Exemplo de retorno de dados do cliente
        const cliente = { id: id, nome: 'Nome do Cliente', email: 'cliente@example.com' };
        callback(null, cliente);
    }
};

// Inicializa o servidor gRPC
const server = new grpc.Server();
server.addService(clienteProto.Cliente.service, clienteService);
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('gRPC Server running at http://0.0.0.0:50051');
server.start();

// Inicializa o servidor Express
app.listen(3000, () => {
    console.log('Express server running on http://localhost:3000');
});
