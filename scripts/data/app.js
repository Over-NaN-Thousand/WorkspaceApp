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
    //Get data from frontend js
    const {
        firstName,
        lastName,
        email,
        password,
        owner,
        coworker
    } = req.body;
    // check if user exists by email, early return.
    const existingUser = await findOneField("usersData", { email });
    if (existingUser)
        return res.status(400).json({ error: "User already exists!" });

    // else try to save to "database"


    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = hashPassword(password, salt);
    const newUser = {
        salt,
        hashedPassword,
        firstName,
        lastName,
        email,
        owner,
        coworker,
    };

    try {
        await insertOneObject("usersData", newUser); //Add newUser data into MongoDB
        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

//==================================End of Routes for user==========================================================//





//========================= Bookings API ===============================//

// POST: Create new booking
app.post('/bookings', async (req, res) => {
    const { workspaceName, leaseType, userId, startTime, endTime } = req.body;

    if (!workspaceName || !leaseType || !userId || !startTime || !endTime) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const db = await connectToDatabase();
        await db.collection("bookings").insertOne({
            workspaceName,
            leaseType,
            userId,
            startTime,
            endTime,
            createdAt: new Date()
        });

        res.status(201).json({ message: "Booking saved to DB" });
    } catch (err) {
        console.error("Booking error:", err);
        res.status(500).json({ error: "Server error while booking" });
    }
});


// GET: Retrieve all bookings
app.get('/bookings', async (req, res) => {
    try {
        await connectToDatabase(async (db) => {
            const bookings = await db.collection("bookings").find({}).toArray();
            res.status(200).json(bookings);
        });
    } catch (err) {
        console.error("Fetching bookings error:", err);
        res.status(500).json({ error: "Failed to retrieve bookings" });
    }
});










app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







