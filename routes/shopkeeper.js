const {ObjectId} = require('bson');
const express = require('express');
const { removeShop } = require('../data/shopkeeper');
//const { ConnectionClosedEvent } = require('mongodb');
const router = express.Router();
const data = require('../data/shopkeeper');

router.get("/", async(req,res)=>{
    if(req.session.username){
        res.redirect("/private");
        return;
    }
    else{
        res.render("s_login/s_login");
        return;
    }
});

router.get("/signup", async(req,res)=>{
    if(req.session.username){
        res.redirect("/private");
        return;
    }
    else{
        res.render("s_signup/s_signup");
        return;
    }
});
router.post("/signup", async(req,res)=>{
    try{
        try{
            console.log(req.body.username);
            console.log(req.body.password);
            const newShopkeeper = await data.createShopkeeper(req.body.ShopName, req.body.username, req.body.ownerFirstname, req.body.ownerLastname, req.body.Address, req.body.email, req.body.pincode, req.body.phoneNumber, req.body.password);
            if(newShopkeeper.userInsterted){
                res.redirect("/");
                return;
            }
        }
        catch(e){
                res.status(400).render("s_signup/s_signup", {"error" : e});
                return;
        }
    }
    catch(e){
        res.status(500).json({error : "Internal server error"});
        return;
    }
});

router.post("/login", async(req,res)=>{
    try{
        try{
            console.log(req.body.username);
            console.log(req.body.password);
            const existingUser = await data.checkShopkeeper(req.body.username, req.body.password);
            console.log(existingUser)
            if(existingUser.authenticated){
                req.session.username = req.body.username;
                res.redirect("/private");
                return;
            }
            else{
                res.status(400).render("s_login/s_login", {"error" : "Invalid username or password"});
            }
        }
        catch(e){
            console.log(e);
            res.status(400).render("s_login/s_login", {"error" : "Either the username or password is incorrect"});
        }
    }
    catch(e){
        res.status(500).json({error : "Internal server error"});
    }
});

router.get("/private", async(req,res)=>{
    res.render("s_private/s_private", {username : req.session.username});
    return;
});

router.get("/:id", async(req,res)=>{
    try {
        let user_id = req.session.id;
        console.log(user_id);
        const existingUser = await data.get(user_id);
        console.log(existingUser);
        let userinfo = existingUser;
        if (existingUser !== null) {
            res.render("s_edit/s_edit", userinfo);
        }
    } catch(e) {
        // dp nothing
    }
    res.render("s_edit/s_edit");
    return;
})
router.put("/edit", async(req,res)=>{
    let shopkeeper_info = req.body;
    if(!(ObjectId.isValid(req.session.id))){
        res.status(400).render("s_edit/s_edit", {"error" : "There is no session created for this id"});
    }
    if(!shopkeeper_info){
        res.status(400).render("s_edit/s_edit", {"error": "Must provide every details in the edit form"});
        return;
    }
    if(!shopkeeper_info.ShopName){
        res.status(400).render("s_edit/s_edit", {"error": "Must provide the Shop name"});
        return;
    }
    if(!shopkeeper_info.username){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide username"});
        return;
    }
    if(!shopkeeper_info.ownerFirstname){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide First name"});
        return;
    }
    if(!shopkeeper_info.ownerLastname){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide Last name"});
        return;
    }
    if(!shopkeeper_info.email){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide email"});
        return;
    }
    if(!shopkeeper_info.phoneNumber){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide phone number"});
    }
    if(!shopkeeper_info.password){
        res.status(400).render("s_edit/s_edit", {"error" : "Must provide password"});
        return;
    }

    // try{
    //     await data.get(req.params.id)
    // }
    // catch(e){
    //     res.status(404).json({error : "Restaurant not found"});
    //     return;
    // }

})

router.get("/logout", async(req,res)=>{
    if(!req.session.username){
        res.redirect('/');
        return;
    }
    req.session.destroy();
    res.render("logout/logout")
});
module.exports = router;