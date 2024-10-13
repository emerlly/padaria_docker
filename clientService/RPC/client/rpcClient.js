const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Carrega o arquivo proto para definir o serviço
const packageDefinition = protoLoader.loadSync('./src/cliente.proto', {});
const padariaProto = grpc.loadPackageDefinition(packageDefinition).padaria;

// Cria um cliente para se conectar ao servidor gRPC
const client = new padariaProto.Padaria('localhost:50052', grpc.credentials.createInsecure());

// Função para cadastrar um cliente
function cadastrarCliente(nome, email, telefone, endereco) {
  client.cadastrarCliente({ nome, email, telefone, endereco }, (error, response) => {
    if (error) {
      console.error('Erro ao cadastrar cliente:', error);
    } else {
      console.log('Cliente cadastrado:', response);
    }
  });
}

// Função para listar um cliente por ID
function listarCliente(id) {
  client.listarCliente({ id }, (error, response) => {
    if (error) {
      console.error('Erro ao listar cliente:', error.message);
    } else {
      console.log('Dados do cliente:', response);
    }
  });
}

// Exportar as funções para que possam ser chamadas de outros módulos ou diretamente via Insomnia
module.exports = {
  cadastrarCliente,
  listarCliente
};
