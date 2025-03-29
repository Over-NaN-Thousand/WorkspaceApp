require('dotenv').config();
const {  MongoClient, ObjectId } = require('mongodb');
const DATABASE = "WorkspaceApp"//Define the Database's name.
const crypto = require('crypto');

//let users = loadUsers();
const jwt = require('jsonwebtoken');


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

async function deleteById(collectionName, id) {
    return await connectToDatabase(async (client) => {
        const db = client.db(DATABASE);
        const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
        return result;
    });
}


async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

//========================The functions of Property=======================//


//===================End of the function of Property==========================//


//===================The function of user===================================//
function hashPassword(password, salt) {
    // https://www.geeksforgeeks.org/node-js-crypto-pbkdf2sync-method/
    return crypto.pbkdf2Sync(password, salt, 10, 64, 'sha512').toString('hex');
}

const verifyToken = (req, res, next) => { 
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token part

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
        req.user = decoded; 
        next(); // Proceed to the next middleware
    } catch (err) { 
        return res.status(401).json({ error: "Invalid token" }); 
    } 
}

















//===================End of the function of user==========================//
module.exports = { 
    connectToDatabase, 
    ObjectId, 

    hashPassword,
    verifyToken,


};

 connectToDatabase(listDatabases); 

