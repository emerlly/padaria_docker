const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./src/cliente.proto', {});
const padariaProto = grpc.loadPackageDefinition(packageDefinition).padaria;

const server = new grpc.Server();

const clientes = [
    { id: '1', nome: 'Cliente 1', email: 'cliente@example.com' },
    { id: '2', nome: 'Cliente 2', email: 'cliente@example.com' },
    { id: '3', nome: 'Cliente 3', email: 'cliente@example.com' }
];
server.addService(padariaProto.Padaria.service, {
    cadastrarCliente: (call, callback) => {
        console.log(call.request);
        callback(null, { message: 'Cliente cadastrado', id: '1' });
    },
    cadastrarVenda: (call, callback) => {
        console.log(call.request);
        callback(null, { message: 'Venda cadastrada', idVenda: '1' });
    },
    listarCliente: function (args, callback) {
        const cliente = clientes.find(c => c.id === args.request.id); 
        if (cliente) {
            callback(null, {
                message: 'Cliente encontrado',
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email
                
            });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Cliente não encontrado'
            });
        }
    }
});
    

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    console.log(`Servidor gRPC rodando na porta ${port}`);
    server.start();
});
