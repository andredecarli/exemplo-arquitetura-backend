// middleware que vai ser executado em todas as requisições.
// middlewares podem ser utilizados para log ou para autenticação
const logger = (req, res, next) => {
  console.log(`${req.method} on ${req.originalUrl} at ${new Date()}`);
  next();
}

export default logger;