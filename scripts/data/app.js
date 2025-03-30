//Import application(For public)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const {
    connectToDatabase,
    ObjectId,
    hashPassword,
    //verifyToken,
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
} = require('./mongo');//To import connectToDatabase from mongo.js

const app = express();
const PORT = process.env.PORT || 3000;

//Import jsonwebtoken and crypto(For member)
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');

//To get the secret key(64-byte, saltString)(For member)
const salt = crypto.randomBytes(64);
const saltString = salt.toString(`hex`);



// app and settings
app.use(cors()); // allow all requests.
app.use(express.json()); // define middleware to parse json










//==========================================Keep CRUD below=========================================//

//For testing used
app.get(`/test-db`, async (req, res) => {
    try {
        await connectToDatabase(async (client) => {  //Connect to database first
            const databasesList = await client.db().admin().listDatabases(); //Display all database files
            const db = client.db(DATABASE);
            const collections = await db.listCollections().toArray(); //Display all the collections in database
            res.status(200).json({          //If success, then display information below
                message: 'Connected to MongoDB successfully',
                databases: databasesList.databases.map(db => db.name),
                collections: collections.map(col => col.name)
            });
        });
    } catch (error) {
        console.error('Test connection error:', error);
        res.status(500).json({ message: 'Failed to connect to MongoDB', error: error.message });
    }
});
//======================================================================================================//

//==================================Routes for Property===================================================//


//==================================End of Routes for Property===================================================//



//==================================Routes for user==========================================================//


app.post('/register', async (req, res) => {
    // If we know the way the frontend is sending the body, we can declare an object to receive the data accordingly:
    const {email, password} = req.body;
    // if user exists, early return.
    const existingUser =await findOneField({email});
    if(existingUser) 
        return res.status(400).json({error: "User already exists!"});
    if(users[email]) 
    
    // else try to save to "database"
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = hashPassword(password, salt);
        const newUser = { salt, hashedPassword };

        users[email] = newUser;
        saveUsers(users);

        res.status(201).json({message: "User registered succesfully!"});
    } catch {
        res.status(500).send("fail");
    }
})

app.delete('/users/:id', async (req, res) => { //Delete user by id
    const userId = req.params.id;

    // Check id if vaild
    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }
    try {
            const result = await deleteById("users", id);  //Then add this code, call deleteById function
            if (result.deletedCount === 0) { //If user id is not in database
                return res.status(404).json({ error: "User not found" }); //Return error
            }
            res.json({ message: `User ${userId} deleted successfully.` });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

//==================================End of Routes for user==========================================================//




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







