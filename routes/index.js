const mainRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/users',mainRoutes)
    /*app.get("/", (req,res) => {
        let title = "People Finder"
        res.render("posts/searching", { title } )

    })*/

  app.use('*', (req, res) => {
    res.status(404).render('pages/error', { "status": 404, "message": "page not found" })
  });
};
const routes = require('./shopkeeper');
const constructorMethod = (app) =>{
    app.use('/', routes);
    // app.use('*', (req,res)=>{
    //     res.render('');
    //     return;
    // });
    // res.send("Invalid");
}

module.exports = constructorMethod;