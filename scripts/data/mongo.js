require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
//const WorkspaceApp = "WorkspaceApp"//Define the Database's name.
const crypto = require('crypto');
let db = null; //// let db=null(meaning no value, false) at first

const jwt = require('jsonwebtoken');
const DATABASE = "WorkspaceApp";
const db_uri = process.env.MONGO_URI;
const client = new MongoClient(db_uri);

async function connectToDatabase() {  //It was (callback, ...args), but no more call back now
    /****************Put this code into your .env*****************
    MONGO_URI=mongodb+srv://UserName:Password@bvccluster.qgjve.mongodb.net/?retryWrites=true&w=majority
    *****************************************************************/

    //=========Please notice everyone if you have edited above code=================//


    try {
        //If db has value which mean has already connected to database, return to db.
        if (db)
            return (db);
        await client.connect();
        db = client.db("WorkspaceApp"); //Once connected to database, change db value to client.db("WorkspaceApp")
        console.log('\nConnected to database');
        //await callback(client, ...args);     //No more call back
        return db;
    } catch (e) {
        console.error(e);
        throw e;


        //No more diconnecting
        /*} finally {
            await client.close();
            console.log('Disconnected from database\n');
        }*/
    }
}

async function listDatabases() {
    const db = await connectToDatabase();
    const databasesList = await db
        .admin()
        .listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

//===========================CRUD for public used========================//
//=====Create=====//
//insertOne()
//insertMany()

//=====Read=======//
//fineOne()
//find()

//======Update=====//

//updateOne()--without $set= Overwrite the whole object---I dont think we will need it, I wrote it for particing purpose
//updataMany()--without $set= Overwrite many whole object---I dont think we will need it, I wrote it for particing purpose
//updateOne()--with $set--input one field= Update one field in one object by any condition
//updataOne()--with $set--input many field= Update many field in one object by any condition
//updateMany()--with $set--input one field=Update one field in many object by any condition
//updateMany()--with $set--input many field=Update many field in many object by any condition



//updateOne()--without $set= Overwrite the whole object---I dont think we will need it, I wrote it for particing purpose
//updataMany()--without $set= Overwrite many whole object---I dont think we will need it, I wrote it for particing purpose
//updateOne()--with $set--input one field= Update one field in one object by any condition
//updataOne()--with $set--input many field= Update many field in one object by any condition
//updateMany()--with $set--input one field=Update one field in many object by any condition
//updateMany()--with $set--input many field=Update many field in many object by any condition



//======Delete======//
//deleteOne()-----Delete one object by any condition    
//deleteMany()----Delete many object by any condition   
//undateOne()--with $unset--input one field = delete one field from one object by any condition
//undateOne()--with $unset--input many field = delete many field from one object by any condition
//updateMany()---with $unset--input one field = delete one field from many object by any condition
//updateMany()---with $unset--input many field = delete many field from many object by any condition

//**********************Create Section*******************************/


//=====================Insert One Object===========================//
async function insertOneObject(collectionName, newObject) {

    //return await connectToDatabase(async (client) => {  //No more call back because 
    const db = await connectToDatabase();//Set db = connectToDatabase()
    const result = await db //db will check if the user has connected to the batabase. If so, db will return as db=client.db("WorkspaceApp");
        .collection(collectionName)
        .insertOne(newObject);
    return result;
    //});
}

//=====================Insert Many Object===========================//
async function insertManyObject(collectionName, newObject) {
    //return await connectToDatabase(async (client) => {
    const db = await connectToDatabase();
    const result = await db
        .collection(collectionName)
        .insertMany(newObject);
    return result;
    //});
}

//**********************End of Create Section*******************************/




//**********************Read Section*******************************/

//=====================Find One Object===========================//
async function findOneField(collectionName, newObject) {
    //return await connectToDatabase(async (client) => {
    const db = await connectToDatabase();
    const result = await db
        .collection(collectionName)
        .findOne(newObject);
    return result;
    //});
}

//=====================Find Many Object===========================//
async function findManyField(collectionName, newObject) {
    //return await connectToDatabase(async (client) => {
    const db = await connectToDatabase();
    const result = await db
        .collection(collectionName)
        .find(newObject).toArray();
    return result;
    //});
}
//**********************End of Read Section*******************************/



//**********************Update Section*******************************/

//=============Overwrite One Object =========//
async function overWriteOnebject(collectionName, condition, newObject) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateOne(condition, newObject);
        return result;
    } catch (error) {
        console.error(`Error overwriting ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Overwrite Many Object ===============//
async function overWriteManyObject(collectionName, condition, newObject) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateMany(condition, newObject);
        return result;
    } catch (error) {
        console.error(`Error overwriting ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Update One Field in One Object=========//
async function updateOneFieldInOneObject(collectionName, condition, newObject, newValue) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateOne(condition, { $set: { [newObject]: newValue } });
        return result;
    } catch (error) {
        console.error(`Error updating ${newObject} from ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Update Many Field in One Object=========//
async function updateManyFieldInOneObject(collectionName, condition, newField) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateOne(condition, { $set: newField });
        return result;
    } catch (error) {
        console.error(`Error updating ${newField} from ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Update One Field in Many Object=========//
async function updateOneFieldInManyObject(collectionName, condition, newObject, newValue) {

    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateMany(condition, { $set: { [newObject]: newValue } });
        return result;
    } catch (error) {
        console.error(`Error updating ${newField} from ${collectionName}:`, error);

        throw error;
    }
    //});
}

//=============Update Many Field in Many Object=========//
async function updateManyFieldInManyObject(collectionName, condition, newField) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateMany(condition, { $set: newField });
        return result;
    } catch (error) {
        console.error(`Error updating ${newField} from ${collectionName}:`, error);
        throw error;
    }
    //});
}
/***********************End of Update section*************************************/


//*************************Delete Section****************************** */

//=============Delete One Object By any collection name and condition==============//
async function deleteOneObject(collectionName, condition) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .deleteOne(condition);
        return result;
    } catch (error) {
        console.error(`Error deleting ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Delete Many Object By any collection name and condition==============//
async function deleteManyObject(collectionName, condition) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .deleteMany(condition);
        return result;
    } catch (error) {
        console.error(`Error deleting ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Delete One Dield By any collection name and condition==============//
async function deleteOneFieldInOneObject(collectionName, condition, fieldName) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateOne(condition, { $unset: { [fieldName]: " " } });
        return result;
    } catch (error) {
        console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Delete One Dield in Many Object By any collection name and condition==============//
async function deleteOneFieldInManyObject(collectionName, condition, fieldName) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateMany(condition, { $unset: { [fieldName]: " " } });
        return result;
    } catch (error) {
        console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Delete Many Field in One Object By any collection name and condition==============//
async function deleteManyFieldInOneObject(collectionName, condition, fieldName) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateOne(condition, { $unset: fieldName });
        return result;
    } catch (error) {
        console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
        throw error;
    }
    //});
}
//=============Delete Many Field in Many Object By any collection name and condition==============//
async function deleteManyFieldInManyObject(collectionName, condition, fieldName) {
    //return await connectToDatabase(async (client) => {
    try {
        const db = await connectToDatabase();
        const result = await db
            .collection(collectionName)
            .updateMany(condition, { $unset: fieldName });
        return result;
    } catch (error) {
        console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
        throw error;
    }
    //});
}

/***********************End of Delete section*************************************/
//================================End of CRUD for public used====================//
/***********************End of Delete section*************************************/
//================================End of CRUD for public used====================//


//========================The functions of Property=======================//


//===================End of the function of Property==========================//


//===================The function of user===================================//
// Function to hash a password. It uses the original passsword string and a "salt". Here's a good article:
// https://medium.com/@amirakhaled2027/understanding-salt-in-node-js-a-comprehensive-guide-to-secure-password-hashing-54cc60890b4a 
function hashPassword(password, salt) {
    // https://www.geeksforgeeks.org/node-js-crypto-pbkdf2sync-method/
    return crypto.pbkdf2Sync(password, salt, 10, 64, 'sha512').toString('hex');
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;//Get the authorization from frontend

    if (!authHeader || !authHeader.startsWith("Bearer ")) { //If there is no authorization or not start with Bearer
        return res.status(403).json({ error: "Unauthorized" });//Error
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);//Decoded by jwt
        req.user = decoded; //Stored to user after docoded
        next(); // Proceed to the next middleware
    } catch (err) { //error
        return res.status(401).json({ error: "Invalid token" });
    }
};



/**************************************************** 
 * Andrei section
 * **************************************************/
// helper function to build filters with min and max values
function buildMinMaxFilter(min, max) {
    
    if (!isNaN(min) && !isNaN(max)) {
        return { $gte: min, $lte: max };
    }
    else if (!isNaN(min)) {
        return { $gte: min };
    } else if (!isNaN(max)) {
        return { $lte: max };
    }
    return {};
}

/************************************************************************
 * Let's declare our functions down here and keep the logic up top.     *
 ************************************************************************/






//AL: this wrapper function takes care of connecting to the database, calling the function we want to execute, error handling, and closing the connection afterwards.
/*Repeated connectToDatabase()
async function connectToDatabase(callback, ...args) {
    const db_uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`;
    
    const client = new MongoClient(db_uri);

    try {
        await client.connect();
        console.log('\nConnected to database');
        return await callback(client, ...args); // call the function with arguments, then return the result
    } catch (e) {
        console.error("Database connection error:", e);
        return res.status(500).json({ message: "Database connection failed." });
    } finally {
        await client.close();
        console.log('Disconnected from database\n');
    }
}*/





async function getHighestId(client, collection, idField) {
    try {
        const result = await client
            .db(DATABASE)
            .collection(collection)
            .find()
            .sort({ [idField]: -1 })   // sort by propertyId DESC
            .limit(1)                   // top 1
            .next();
        //console.log(`Highest ${idField} in ${collection}:`, result);
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


async function getWorkspacesWithProperties(client, filters) {
    try {
        const result = await client
            .db(DATABASE)
            .collection("workspaces")
            .aggregate([
                {
                    $match: filters // apply filters
                },
                {
                    $lookup: {
                        from: "properties",         // join with properties
                        localField: "propertyId",   // foreign key in workspaces
                        foreignField: "propertyId", // primary key in properties
                        as: "propertyDetails"       // result joined array
                    }
                },
                {
                    $unwind: "$propertyDetails"     // flatten the array
                },
                {
                    $project: { // Project specific fields to flatten `propertyDetails`
                        workspaceID: 1,
                        workspaceName: 1,
                        imgFileName: 1,
                        workspaceType: 1,
                        leaseTerm: 1,
                        sqFt: 1,
                        seatCapacity: 1,
                        price: 1,
                        amenities: 1,
                        propertyId: 1,
                        ownerId: 1,
                        rating: 1,
                        name: "$propertyDetails.name",
                        address1: "$propertyDetails.address1",
                        address2: "$propertyDetails.address2",
                        postalcode: "$propertyDetails.postalcode",
                        city: "$propertyDetails.city",
                        province: "$propertyDetails.province",
                        country: "$propertyDetails.country",
                        neighborhood: "$propertyDetails.neighbourhood", 
                        propertyImgFileName: "$propertyDetails.imgFileName", 
                        propertyOwnerId: "$propertyDetails.ownerId"
                    
                    }
                }

            ]).toArray();

        return result;
    } catch (error) {
        console.error("Error performing workspace-property join:", error);
        throw error;
    }
}


async function getWorkspaces(client, filters) {
    try {
        const result = await client
            .db(DATABASE)
            .collection("workspaces")
            .find(filters)
            .toArray();
        return result;
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        throw error;
    }
}

async function updateWorkspace(client, workspaceID, updates) {
    try {
        const result = await client
            .db(DATABASE)
            .collection("workspaces")
            .updateOne(
                { workspaceID }, // only update one document with workspaceId
                { $set: updates }
            );

        console.log(`Modified workspace:  workspaceId=${workspaceID}.`);
        return result;
    } catch (error) {
        console.error("Error updating workspace: ", error);
        throw error;
    }
}

async function deleteWorkspace(client, workspaceID) {
    try {
        const result = await client
            .db(DATABASE)
            .collection("workspaces")
            .deleteOne({ workspaceID });
        console.log(`Deleted property: propertyId=${workspaceID}.`);
        return result;
    } catch (error) {
        console.error("Error deleting workspace:", error);
        throw error;
    }
}



async function connectToDatabaseB(callback, ...args) {

    try {
        
        //const db_uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}`;   
         //const client = new MongoClient(db_uri);

        //await client.connect();
        console.log('\nConnected to database');
        return await callback(client, ...args); // call the function with arguments, then return the result
    } catch (e) {
        console.error("Database connection error:", e);
        throw e;
    } /*finally {
        await client.close();
        console.log('Disconnected from database\n');
    }*/
}










//===================End of the function of user==========================//
module.exports = {
    connectToDatabaseB,
    connectToDatabase,
    ObjectId,
    hashPassword,
    verifyToken,
    deleteOneFieldInOneObject,
    deleteOneFieldInManyObject,
    deleteManyFieldInOneObject,
    deleteManyFieldInManyObject,
    deleteOneObject,
    deleteManyObject,
    overWriteOnebject,
    overWriteManyObject,
    updateOneFieldInOneObject,
    updateOneFieldInManyObject,
    updateManyFieldInManyObject,
    updateManyFieldInOneObject,
    insertOneObject,
    insertManyObject,
    findOneField,
    findManyField,
    createProperty,
    buildMinMaxFilter,
    getHighestId,
    readProperties,
    updateProperty,
    deleteProperty,
    getWorkspacesWithProperties,
    getWorkspaces,
    updateWorkspace,
    deleteWorkspace

};


listDatabases();
