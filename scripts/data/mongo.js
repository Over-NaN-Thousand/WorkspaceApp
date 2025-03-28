require('dotenv').config();

const {  MongoClient, ObjectId } = require('mongodb');
const DATABASE = "WorkspaceApp"//Define the Database's name.

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

//========================The functions of Property=======================//
async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


async function getHighestId(client, collection, idField) {
    try {
        const result = await client
            .db(DATABASE)
            .collection(collection)
            .find()
            .sort({ [idField]: -1 })   // sort by propertyId DESC
            .limit(1)                   // top 1
            .next();

        return result;
    } catch (error) {
        console.error("Error fetching the highest propertyId:", error);
        throw error;
    }
}

async function createProperty(client, property) {
    try {
        const result = await client
            .db(DATABASE)
            .collection("properties")
            .insertOne(property); // insert the property
        
        console.log(`Property inserted successfully with ID: ${result.insertedId}`);
        return result;
    } catch (error) {
        console.error("Error inserting property into the database:", error);
        throw error;
    }
}

async function readProperties(client, filters) {
    try {
        const properties = await client
            .db(DATABASE)
            .collection("properties")
            .find(filters)
            .toArray(); // make an array

        console.log(`Retrieved ${properties.length} property(ies).`);
        return properties;
    } catch (error) {
        console.error("Error retrieving properties:", error);
        throw error;
    }
}

async function updateProperty(client, propertyId, updates) {
    try {
        const result = await client
            .db(DATABASE)
            .collection("properties")
            .updateOne(
                { propertyId }, // only update one document with propertyId
                { $set: updates }
            );

        console.log(`Modified property:  propertyId=${propertyId}.`);
        return result;
    } catch (error) {
        console.error("Error updating property: ", error);
        throw error;
    }
}

async function deleteProperty(client, propertyId) {
    try {
        const result = await client
            .db(DATABASE)
            .collection("properties")
            .deleteOne({ propertyId });
        console.log(`Deleted property: propertyId=${propertyId}.`);
        return result;
    } catch (error) {
        console.error("Error deleting property:", error);
        throw error;
    }
}
//===================End of the function of Property==========================//

module.exports = { 
    connectToDatabase, 
    ObjectId, 
    getHighestId, 
    createProperty, 
    readProperties, 
    updateProperty, 
    deleteProperty 
};

 connectToDatabase(listDatabases); 

