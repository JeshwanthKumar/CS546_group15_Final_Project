const express = require("express");
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use("/public", express.static(__dirname + "/public"));
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
const configRoutes = require('./routes');
app.use(methodOverride('_method'));

  configRoutes(app);
  
  app.listen(3000, () => {
      console.log("Your server started at http://localhost:3000");
  })