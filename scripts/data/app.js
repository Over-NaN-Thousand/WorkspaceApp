//Import application(For public)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const {
    connectToDatabase,
    hashPassword,
    verifyToken,
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

app.get("/protected", verifyToken, (req, res) => {
    const { user } = req;
    res.json({ msg: `Welcome ${user.email}` });
});


app.get('/', verifyToken, (req, res) => {
    console.log("User data from token:", req.user);
    res.json(req.user);
});

// Let's define our registration route:
app.post('/signup', async (req, res) => {
    // If we know the way the frontend is sending the body, we can declare an object to receive the data accordingly:
    const { email, password } = req.body;


    // else try to save to "database"
    try {
        await connectToDatabase(async (client) => {
            const db = client.db(DATABASE);
            const usersCollection = db.collection("users");

            const existingUser = await usersCollection.findOne({ email });
            if (existingUser) return res.status(400).json({ error: "User already exists!" });
        const salt = crypto.randomBytes(64).toString('hex');
        const hashedPassword = hashPassword(password, salt);
        const newUser = { salt, hashedPassword };

        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: "User registered successfully!" });
    });
} catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
}
});

app.post('/login', async (req, res) => {
    // just simulating, we already got the user by req.body.email from database
    const { email, password } = req.body;
    const user = users[email];

    // If not found, early return.
    if (!user) return res.status(400).json({ error: "User not found" });

    // else try to authenticate
    try {
        const hashedPassword = hashPassword(password, user.salt);
        if (hashedPassword !== user.hashedPassword) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    } catch {
        res.status(500).send()
    }
    const token = jwt.sign({ email },
        process.env.JWT_SECRET_KEY, {
        expiresIn: 86400
    });
    res.json({ email, token, message: "Login successful" });
})

//==================================End of Routes for user==========================================================//




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







