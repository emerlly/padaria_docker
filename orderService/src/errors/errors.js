function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(500).send('Erro ao processar a requisição');
  }
  
  module.exports = errorHandler;