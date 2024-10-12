const grpc = require('grpc');
const pagamentosProto = require('./pagamentos.proto');

const pagamentosServer = new grpc.Server();
pagamentosServer.addService(pagamentosProto.PagamentosService, {
  // Implementação do serviço de pagamentos
});

pagamentosServer.bind('0.0.0.0:8082', grpc.ServerCredentials.createInsecure());
pagamentosServer.start();