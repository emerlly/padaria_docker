module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testRegex: '^.*/tests/.*\\.test\\.js$',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  verbose: true,
  env:{
    PROTO_PATH: './clientService/src/cliente.proto',
  }
};

