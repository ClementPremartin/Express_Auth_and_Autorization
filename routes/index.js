const beersRouter = require('./beers');
const authRouter = require('./auth');

const setupRoutes = (app) => {
  app.use('/api/beers', beersRouter);
  app.use('/api/auth', authRouter)
};

module.exports = {
  setupRoutes,
};