const product = require('./products');
const shop = require('./shopkeeper');
const users = require('./users');

const constructorMethod = (app) => {

  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/users', users);
  app.use('/shop/allProduct', async(req,res)=>{
    res.render("/productList");
  })
  app.use('/',(req, res) => {
    res.render("pages/home");
  });



  app.use("*", (req, res) => {
    res.redirect('/');
  });

}



module.exports = constructorMethod;