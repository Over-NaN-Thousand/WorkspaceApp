//Import application(For public)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const {
    connectToDatabase,
    /*getHighestId,
    createProperty,
    readProperties,
    updateProperty,
    deleteProperty*/
} = require('./mongo');//To import connectToDatabase from mongo.js
const app = express();
const PORT = process.env.PORT || 3000;

//Import jsonwebtoken and crypto(For member)
//const jwt = require('jsonwebtoken');
//const crypto = require('node:crypto');

//To get the secret key(64-byte, saltString)(For member)
//const salt = crypto.randomBytes(64);
//const saltString = salt.toString(`hex`);



// app and settings
app.use(cors()); // allow all requests.
app.use(express.json()); // define middleware to parse json

//Define and connect the Database's name.
const DATABASE = "WorkspaceApp";








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



//==================================End of Routes for user==========================================================//




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







