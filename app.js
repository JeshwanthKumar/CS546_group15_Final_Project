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

// KKKKK

app.use(
    session({
        name: 'AuthCookie',
        secret: "some secret string!",
        saveUninitialized: true,
        resave: false,
    })
);


//KKKK  

configRoutes(app);

const port = 3002;

app.listen(port, () => {
    console.log("The server is up and running !!!");
    console.log(`The routes are running on http://localhost:${port}`);
});