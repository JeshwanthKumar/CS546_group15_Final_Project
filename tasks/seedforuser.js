const dbConnection = require('../config/mongoConnections');
const user = require('../data/user');
async function main(){
    const db = await dbConnection();
    await db.dropDatabase();
  
    try {
      const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
      console.log(user1);
    } catch (e) {
      console.log(e);
    }
    try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "b@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
      try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st"," new jersey"," 07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
      try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
      try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
      try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
      try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey"," 07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
      try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st"," new jersey", "07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
      try {
        const user1 = await restaurants.create("parthkumar", "hirpara", "a@gmail.com", "13 washington st", "new jersey", "07307", "aaaaaa");
        console.log(user1);
      } catch (e) {
        console.log(e);
      }
}