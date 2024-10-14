const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const connection = require('../../src/config/connection'); // Configuração da conexão com o banco de dados
const databaseConfig = require('../../src/config/database'); // Configuração do nome do seu banco de dados

const packageDefinition = require('../../src/clientLoader.js');
const padariaProto = grpc.loadPackageDefinition(packageDefinition).padaria;

// Inicializar o servidor gRPC
const server = new grpc.Server();

// Função para cadastrar um cliente no banco de dados
async function cadastrarCliente(call, callback) {
    const { nome, email, endereco, telefone } = call.request;

    try {
        const conn = await connection(); // Conexão com o banco de dados
        await conn.query(`use ${databaseConfig.database}`); // Use o nome do seu banco de dados

        const sql = 'INSERT INTO clientes (nome, email, endereco, telefone) VALUES (?, ?, ?, ?)';
        const [result] = await conn.query(sql, [nome, email, endereco, telefone]); // Insere o cliente no banco de dados

        await conn.end();
        callback(null, { message: 'Cliente cadastrado com sucesso', id: result.insertId.toString() });
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Erro ao cadastrar cliente',
        });
    }
}

// Função para listar um cliente específico do banco de dados
async function listarCliente(call, callback) {
    const clienteId = call.request.id;

    try {
        const conn = await connection(); // Conexão com o banco de dados
        await conn.query(`use ${databaseConfig.database}`); // Use o nome do seu banco de dados

        const sql = 'SELECT * FROM clientes WHERE id = ?';
        const [rows] = await conn.query(sql, [clienteId]); // Busca o cliente no banco de dados

        await conn.end();
        if (rows.length > 0) {
            const cliente = rows[0];
            callback(null, {
                message: 'Cliente encontrado',
                id: cliente.id.toString(),
                nome: cliente.nome,
                email: cliente.email,
                endereco: cliente.endereco,
                telefone: cliente.telefone,
            });
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Cliente não encontrado',
            });
        }
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        callback({
            code: grpc.status.INTERNAL,
            details: 'Erro ao buscar cliente',
        });
    }
}

// Adiciona as funções ao serviço gRPC
server.addService(padariaProto.Padaria.service, {
    cadastrarCliente,
    listarCliente,
});

// Iniciar o servidor na porta especificada
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error('Erro ao iniciar o servidor gRPC:', error);
        return;
    }
    console.log(`Servidor gRPC rodando na porta ${port}`);
    
});
