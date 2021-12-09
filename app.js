const express = require("express");
const app = express();
const routes = require('./routes');
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/public", express.static(__dirname + "/public"));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


routes(app);

app.listen(3001, () => {
  console.log("Your server started at http://localhost:3001");
})