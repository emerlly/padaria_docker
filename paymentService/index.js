const path = require('path');

const serverPath = path.join(__dirname, 'RPC', 'server', 'rpcServer.js');
const clientPath = path.join(__dirname, 'RPC', 'client', 'rpcClient.js');

require(serverPath);
require(clientPath);
console.log('Servidor iniciado');
