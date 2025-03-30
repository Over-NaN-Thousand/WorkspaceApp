require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const DATABASE = "WorkspaceApp"//Define the Database's name.
const crypto = require('crypto');

//let users = loadUsers();
const jwt = require('jsonwebtoken');


async function connectToDatabase(callback, ...args) {
    /****************Put this code into your .env*****************
    MONGO_URI=mongodb+srv://UserName:Password@bvccluster.qgjve.mongodb.net/?retryWrites=true&w=majority
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

async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();
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



//======Delete======//
//deleteOne()-----Delete one object by any condition    
//deleteMany()----Delete many object by any condition   
//undateOne()------with $unset = delete one field from one object by any condition
//updateMany()-----with $unset = delete many field from many object by any condition

//**********************Update Section*******************************/

//=============Overwrite One Object =========//
async function overWriteOnebject(collectionName, condition, newObject) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateOne(condition, newObject);
            return result;
        } catch (error) {
            console.error(`Error overwriting ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Overwrite Many Object ===============//
async function overWriteManyObject(collectionName, condition, newObject) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateMany(condition, newObject);
            return result;
        } catch (error) {
            console.error(`Error overwriting ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Update One Field in One Object=========//
async function updateOneFieldInOneObject(collectionName, condition, newObject, newValue) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateOne(condition, {$set:{[newObject]:newValue}});
            return result;
        } catch (error) {
            console.error(`Error updating ${newObject} from ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Update Many Field in One Object=========//
async function updateManyFieldInOneObject(collectionName, condition, newField) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateOne(condition, {$set:newField});
            return result;
        } catch (error) {
            console.error(`Error updating ${newField} from ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Update One Field in Many Object=========//
async function updateOneFieldInManyObject(collectionName, condition, newObject, newValue) {

    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)

                .updateMany(condition, {$set:{[newObject]:newValue}});
            return result;
        } catch (error) {
            console.error(`Error updating ${newField} from ${collectionName}:`, error);

            throw error;
        }
    });
}

//=============Update Many Field in Many Object=========//
async function updateManyFieldInManyObject(collectionName, condition, newField) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateMany(condition, {$set:newField});
            return result;
        } catch (error) {
            console.error(`Error updating ${newField} from ${collectionName}:`, error);
            throw error;
        }
    });
}
/***********************End of Update section*************************************/


//*************************Delete Section****************************** */

//=============Delete One Object By any collection name and condition==============//
async function deleteOneObject(collectionName, condition) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .deleteOne(condition);
            return result;
        } catch (error) {
            console.error(`Error deleting ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Delete Many Object By any collection name and condition==============//
async function deleteManyObject(collectionName, condition) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .deleteMany(condition);
            return result;
        } catch (error) {
            console.error(`Error deleting ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Delete One Dield By any collection name and condition==============//
async function deleteOneFieldInOneObject(collectionName, condition, fieldName) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateOne(condition, {$unset:{[fieldName]:" "}});
            return result;
        } catch (error) {
            console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Delete One Dield in Many Object By any collection name and condition==============//
async function deleteOneFieldInManyObject(collectionName, condition, fieldName) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateMany(condition, {$unset:{[fieldName]:" "}});
            return result;
        } catch (error) {
            console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Delete Many Field in One Object By any collection name and condition==============//
async function deleteManyFieldInOneObject(collectionName, condition, fieldName) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateOne(condition, {$unset:fieldName});
            return result;
        } catch (error) {
            console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
            throw error;
        }
    });
}
//=============Delete Many Field in Many Object By any collection name and condition==============//
async function deleteManyFieldInManyObject(collectionName, condition, fieldName) {
    return await connectToDatabase(async (client) => {
        try {
            const result = await client
                .db(DATABASE)
                .collection(collectionName)
                .updateMany(condition, {$unset:fieldName});
            return result;
        } catch (error) {
            console.error(`Error deleting ${fieldName} from ${collectionName}:`, error);
            throw error;
        }
    });
}

/***********************End of Delete section*************************************/
//================================End of CRUD for public used====================//


//========================The functions of Property=======================//


//===================End of the function of Property==========================//


//===================The function of user===================================//
function hashPassword(password, salt) {
    // https://www.geeksforgeeks.org/node-js-crypto-pbkdf2sync-method/
    return crypto.pbkdf2Sync(password, salt, 10, 64, 'sha512').toString('hex');
}

/*const verifyToken = (req, res, next) => { 
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
}*/

















//===================End of the function of user==========================//
module.exports = {
    connectToDatabase,
    ObjectId,
    hashPassword,
    //verifyToken,
    deleteOneFieldInOneObject,
    deleteOneFieldInManyObject,
    deleteManyFieldInOneObject,
    deleteOneFieldInManyObject,
    deleteOneObject,
    deleteManyObject,
    overWriteOnebject,
    overWriteManyObject,
    updateOneFieldInOneObject,
    updateOneFieldInManyObject,
    updateManyFieldInManyObject,
    updateManyFieldInOneObject,
    

};

connectToDatabase(listDatabases);

