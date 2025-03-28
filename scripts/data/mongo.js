require('dotenv').config();
const {  MongoClient, ObjectId } = require('mongodb');
const DATABASE = "WorkspaceApp"//Define the Database's name.
const crypto = require('crypto');
//let users = loadUsers();

async function connectToDatabase(callback, ...args) {
    /****************Put this code into your .env*****************
    MONGO_URI=mongodb+srv://USERNAME:PASSWORD@group8.llbev.mongodb.net/?retryWrites=true&w=majority
    *****************************************************************/
    const db_uri = process.env.MONGO_URI;
    const client = new MongoClient(db_uri);


//=========Please notice everyone if you have edited above code=================//

    try {
        await client.connect();
        console.log('\nConnected to database');
        await callback(client, ...args);
    } catch (e) {
        console.error(e);

    } finally {
        await client.close();
        console.log('Disconnected from database\n');
    }
}


async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

//========================The functions of Property=======================//





//===================End of the function of Property==========================//


//===================The function of user===================================//

















//===================End of the function of user==========================//
module.exports = { 
    connectToDatabase, 
    ObjectId, 
    /*getHighestId, 
    createProperty, 
    readProperties, 
    updateProperty, 
    deleteProperty */
};


 connectToDatabase(listDatabases); 

