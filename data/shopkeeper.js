

const mongoCollections = require('./config/collection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const user= mongoCollections.user;
module.exports={

    async create(firstname,lastname,email,address,city, zipcode,password){

        if(!(firstname)|(!(lastname))|!(email)|(!(address))|(!(city))|(!(zipcode))|!(password)){
            throw 'there should be a valid input of the values'
          }
        if(typeof firstname ==='boolean'|typeof lastname ==='boolean'|typeof email ==='boolean'|typeof address ==='boolean'|typeof city ==='boolean'|typeof zipcode ==='boolean'|typeof password ==='boolean'){
              throw "input cannot be a boolean"
          }
        if(typeof firstname === 'string'&typeof lastname === 'string'&typeof email === 'string'&typeof address === 'string'&typeof city === 'string'&typeof zipcode === 'string'&typeof password === 'string'){
              if(firstname.trim()==""|lastname.trim()==""|email.trim()==""|address.trim()==""|city.trim()==""|zipcode.trim()==""|password.trim()==""){
                  throw " it should not be an empty string"
              }
        }else{throw "firstname, lastname, email, website, priceRange should be a string"}
          
        var validator = require("email-validator");
        if( validator.validate(email)==false){
            throw "enter a valid email address"
        }
        var pat1=/(^\d{5}$)|(^\d{5}-\d{4}$)/
        if(pat1.test(zipcode)==false){
            throw "enter a valid zipcode"
        }
        if(password.length<6) throw "Password should have atleast 6 characters"
        
        const hash = await bcrypt.hash(password, saltRounds);
        const hashpassword=hash



        const mongoColl = await user()

        let newres={
            firstname: firstname,
            lastname: lastname,
            email: email,
            address:address,
            city:city,
            zipcode:zipcode,
            password:hashpassword,
            rating:{},
            comment:{}
        }
        const insertInfo = await mongoColl.insertOne(newres)
        if(insertInfo.length=0){
            throw "There has been some server issue"
        }
    },




    async update(firstname,lastname,email,address,city, zipcode,password){

        























    }

}


=======
const {ObjectId} = require('bson');
const mongoCollections = require("../config/mongoCollections");
const bcrypt = require('bcrypt');
const saltRounds = 16;
const shopkeeper = mongoCollections.shopkeeper;
module.exports = {
 async createShopkeeper(ShopName, username, ownerFirstname, ownerLastname, Address, email, pincode, phoneNumber, password){
        const shopkeeperCollections = await shopkeeper();
        const hashed_pass = await bcrypt.hash(password, saltRounds);
        let lower = username.toLowerCase();
        let newShopkeeper = {
            ShopName : ShopName,
            username : lower,
            ownerFirstname : ownerFirstname,
            ownerLastname : ownerLastname,
            Address : Address,
            email : email,
            pincode : pincode,
            phoneNumber : phoneNumber,
            password : hashed_pass,
        }
        const duplicateUser = await shopkeeperCollections.findOne({username : username});
        if(duplicateUser !== null)
        throw 'There is already an user containing the same username';
        const insertInfo = await shopkeeperCollections.insertOne(newShopkeeper);
        if(insertInfo.insertedCount === 0)
        throw 'Could not create user';
        // const new_id = insertInfo.insertedId;
        // const shopkeepers = await this.get(new_id.toString());
      //  return shopkeepers
        return {userInsterted : true};

    },
    async checkShopkeeper(username, password){
        const shopkeeperCollections = await shopkeeper();
        const findShopKeeper = await shopkeeperCollections.findOne({username : username});
        console.log(findShopKeeper);
        if(findShopKeeper === null){
            throw 'Either the username or password is incorrect';
        }
        let comparedPass = false;
        try{
            comparedPass = await bcrypt.compare(password, findShopKeeper.password);
            console.log(comparedPass);
            if(comparedPass === true){
                let authentication = {authenticated : true, authenticatedUser : findShopKeeper };
                return authentication;
            } 
            else
            throw 'Either the username or password is incorrect';
        }
        catch(e){
            console.log(e);
        }
    },

    async get(id){
        if(!id)
        throw `You must provide an id to search for`;
        if(typeof id !== 'string')
        throw 'You must provide a valid id';
        if( id.length === 0)
        throw `The given id is empty`;
        if (!ObjectId.isValid(id))
        throw `The given objectId <${id}> is not a valid objectId`
        const shopkeeper_id = new ObjectId(id);
        const shopkeeperCollections = await shopkeeper();
        const shopkeeperid = await shopkeeperCollections.findOne({_id: ObjectId(shopkeeper_id)});
        if(shopkeeperid === null)
        throw `There is no shop with <${id}>`;
        return shopkeeperid;
    },
    async removeShop(id){
        const removeId = new ObjectId(id);
        const ShopName = await this.get(id);
        const shopkeeperCollections = await shopkeeper();
        const deleteInfo = await shopkeeperCollections.deleteOne({_id : ObjectId(removeId)});
        if(deleteInfo.deletedCount === 0)
        throw `Could not delete the shop with ${id}`;
        return {deleted : true};
    },

    async updateShopkeeper(id, ShopName, username, ownerFirstname, ownerLastname, email, phoneNumber, password){
        const UpdateInfo = await this.get(id);
        let updatedLower = username.toLowerCase();
        let shopkeeper_update = {
            ShopName : ShopName,
            username : updatedLower,
            ownerFirstname : ownerFirstname,
            ownerLastname : ownerLastname,
            email : email,
            phoneNumber : phoneNumber
        }
        const shopkeeperCollections = await shopkeeper();
        const UpdatedInfo = await shopkeeperCollections.updateOne( 
            {_id : ObjectId(id)},
            {$set : shopkeeper_update}
        );
        if(!UpdatedInfo.matchedCount && !UpdatedInfo.modifiedCount)
        throw 'Updation failed';
        return {updateInserted : true};
    }
}

