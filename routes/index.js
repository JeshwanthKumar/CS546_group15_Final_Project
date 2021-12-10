
const routes = require('./shopkeeper');
const constructorMethod = (app) => {
  app.use('/', routes);  
  app.use('*', (req, res) => {
    res.status(404).render('pages/error', { "status": 404, "message": "page not found" })
  });
};


module.exports = constructorMethod;