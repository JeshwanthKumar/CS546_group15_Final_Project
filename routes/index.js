const product = require('./products');
const shop = require('./shopkeeper');
const user = require('./user');

const constructorMethod = (app) => {

  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/users', user);

  app.use("*", (req, res) => {
   res.redirect('/');
  });

}

module.exports = constructorMethod;