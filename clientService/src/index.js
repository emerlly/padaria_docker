const jayson = require('jayson');
const connection = require('./config/conection'); // Importa a conexão com o banco de dados

// Dados de exemplo para contatos


// Cria o servidor JSON-RPC
const server = jayson.server({
  registrarCliente: async function(args, callback) {
    const cliente = {
      nome: args[0],
      email: args[1],
      endereco: args[2],
      telefone: args[3],
    };

    try {
      const conn = await connection();
      await conn.query(`USE DATA BASE ${databaseConfig.database}`); // Altere para o nome correto do banco de dados

      // Comando SQL para inserir o cliente no banco de dados
      const sql = 'INSERT INTO clientes (nome, email, endereco, telefone) VALUES (?, ?, ?, ?)';
      const [result] = await conn.query(sql, [cliente.nome, cliente.email, cliente.endereco, cliente.telefone]);

      // Fechar a conexão após o uso
      await conn.end();

      // Retornar a resposta com o ID do cliente recém-criado
      callback(null, { message: 'Cliente registrado com sucesso!', id: result.insertId });
    } catch (error) {
      console.error('Erro ao registrar cliente:', error);
      callback({ code: 'INTERNAL_ERROR', message: 'Erro ao registrar cliente no banco de dados' });
    }
  },

  consultarCliente: function(args, callback) {
    const id = args[0];
    // Encontrar o cliente pelo ID
    const cliente = clientes.find((c) => c.id === id);

    if (cliente) {
      callback(null, cliente);
    } else {
      callback({ code: 'NOT_FOUND', message: 'Cliente não encontrado' });
    }
  },

  listaClientes: function(args, callback) {
    // Retorna a lista de todos os clientes
    callback(null, clientes);
  },

  saveCliente: function(args, callback) {
    const cliente = {
      id: clientes.length + 1,
      nome: args[0],
      email: args[1],
      endereco: args[2],
      telefone: args[3],
    };

    // Adiciona o novo cliente à lista
    clientes.push(cliente);

    callback(null, cliente);
  }
});

// Inicializa o servidor HTTP do JSON-RPC
server.http().listen(8081, () => {
  console.log('JSON-RPC server is running on port 8081');
});
