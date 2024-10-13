const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const packageDefinition = protoLoader.loadSync(path.join(__dirname, './cliente.proto'), {});
module.exports = packageDefinition;
