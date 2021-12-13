// const MongoClient = require('mongodb').MongoClient;
// const settings =  {
//     mongoConfig: {
//       // serverUrl: 'mongodb+srv://smart:007@qwerT@cluster0.cunqm.mongodb.net/',
//       // database: 'Group_15'
//      //     serverUrl: 'mongodb://localhost:27017/',
//     database: 'G15'
//     }
//   };
//   const mongoConfig = settings.mongoConfig;
//   let _connection = undefined;
// let _db = undefined;


// module.exports = {
//     getDb : async () => {

//   if (!_connection) {
//     _connection = await MongoClient.connect(mongoConfig.serverUrl, {
//       useNewUrlParser: true
//     }, {useUnifiedTopology: true}, { useUnifiedTopology: true });
//     _db = await _connection.db(mongoConfig.database);
//   }

//   return _db;

// },
// removeConnection: async () => {
//     _connection.close();
//   }
// }

const MongoClient = require('mongodb').MongoClient;
const settings = {
  mongoConfig: {
      serverUrl: 'mongodb+srv://smart:007@qwerT@cluster0.cunqm.mongodb.net/',
      database: 'Group_15'
    }
    //serverUrl: 'mongodb://localhost:27017/',
    //database: 'GROUP15'
// }
};
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};


