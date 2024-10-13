const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('./src/cliente.proto', {});
const padariaProto = grpc.loadPackageDefinition(packageDefinition).padaria;

const client = new padariaProto.Padaria('localhost:50051', grpc.credentials.createInsecure());

client.cadastrarCliente({ nome: 'Cliente 1', email: 'cliente@example.com' }, (error, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log(response.message);
    }
});

client.cadastrarVenda({ idCliente: '1', produtos: ['Produto 1', 'Produto 2'] }, (error, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log(response.message);
    }
});

client.listarCliente({ id: '1' }, (error, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log(response);
    }
});
