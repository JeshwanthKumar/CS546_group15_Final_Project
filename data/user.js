const mongoCollections = require('../config/mongoCollections');
const user = mongoCollections.user;
var mongoose = require('mongoose');
const {
    replayMessages
} = require('../config/mongoCollections');
const shop = mongoCollections.shopkeeper;
const messages = mongoCollections.message;
const replayMessage = mongoCollections.replayMessages;

const exportedMethods = {

    async getAll() {
        const movieCollection = await user();
        const movieList = await movieCollection.find({}).toArray();
        return movieList;
    },

    async getUser(id) {
        var x = id.toString()
        var convertId = mongoose.Types.ObjectId(id);
        const findShopItem = await user();
        const findShop = await findShopItem.findOne({
            _id: convertId
        });
        return findShop;
    },

    async create(firstname, lastname, email, address, city, zipcode, password) {

        const mongoColl = await user()

        let newres = {
            firstname: firstname,
            lastname: lastname,
            address: address,
            city: city,
            zipcode: zipcode,
            item: [],
            replayMessages: []

        }
        const insertInfo = await mongoColl.insertOne(newres)
        if (insertInfo.length = 0) {
            throw "There has been some server issue"
        } else {
            return true
        }

    },

    async removeMessage(messageId) {
        var iddItem = mongoose.Types.ObjectId(messageId);
        const messageCollection = await replayMessages();
        const userCollection = await user();

        const usergetDetail = await messageCollection.findOne({
            _id: iddItem
        })
        var userId = usergetDetail.idUser;
        await messageCollection.deleteOne({
            _id: iddItem
        });

        await userCollection.updateOne({
            _id: userId
        }, {
            $pull: {
                replayMessages: {
                    _id: iddItem
                }
            }
        });
        return;

    },

    async replayMessage(idusers, storeId, replayMessages) {
        var id = mongoose.Types.ObjectId();

        var iduserCon = mongoose.Types.ObjectId(idusers);
        var storeIdCon = mongoose.Types.ObjectId(storeId);
        const userInfo = await this.getUser(idusers);
        const findShop = await shop();
        const shopDetail = await findShop.findOne({
            _id: storeIdCon
        });
        const userCollection = await user();
        var messagereplayCollection = await replayMessage();

        const messageCollection = await messages();
        const sendMessage = await messageCollection.find({}).toArray();


        var finalMessage;

        sendMessage.forEach(x => {

            if (x.shopId == storeIdCon) {
                finalMessage = x
            }
            return;
        })

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

        var userReplaymessage = {
            _id: id,
            idUser: iduserCon,
            message: replayMessages,
            userName: userInfo.firstname,   
            shopNmae: shopDetail.name,
            isShop: storeIdCon,
            date: date
        }
        const newaddedItem = await messagereplayCollection.insertOne(userReplaymessage);
        const newInsertInformation = await userCollection.updateOne({
            _id: finalMessage.idUser
        }, {
            $push: {
                replayMessages: userReplaymessage
            }
        })
        return;
    }

}

module.exports = exportedMethods;