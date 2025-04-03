//Import application(For public)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
//const { MongoClient } = require('mongodb');
const {
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
} = require('./mongo');//To import connectToDatabase from mongo.js

const app = express();
const PORT = process.env.PORT || 3000;

//Import jsonwebtoken and crypto(For member)
const jwt = require('jsonwebtoken');
const crypto = require('node:crypto');


//const saltString = salt.toString(`hex`);
//console.log("Length:", saltString);


// app and settings
app.use(cors()); // allow all requests.
app.use(express.json()); // Convert to parse json










//==========================================Keep CRUD below=========================================//

//For testing used
/*app.get(`/test-db`, async (req, res) => {
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
});*/
//======================================================================================================//

//==================================Routes for Property===================================================//


//==================================End of Routes for Property===================================================//



//==================================Routes for user==========================================================//


app.post('/register', async (req, res) => {
    //Get data from frontend js
    const {
        firstName,
        lastName,
        phoneNumber,
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
//To get the secret key(64-byte, saltString)(For member)
const salt = crypto.randomBytes(64).toString('hex');
    const hashedPassword = hashPassword(password, salt);
    const newUser = {
        salt,
        hashedPassword,
        firstName,
        lastName,
        phoneNumber,
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body; //Get the email, password from frontend


    // else try to authenticate
    try {
        // Find the user data by email then store into existingUser
        const existingUser = await findOneField("usersData", { email });
        // If not found, early return.
        if (!existingUser)
            return res.status(400).json({ error: "User not found" });
        //Hash the password, which the user provided to login, with the salt which the user saved in the database
        const hashedPassword = hashPassword(password, existingUser.salt);
        //If the new hashed password is not the same as the hashed password stored in database
        if (hashedPassword !== existingUser.hashedPassword) {
            return res.status(401).json({ error: "Invalid credentials" });//Wrong password
        }
        //else create token to front end with expiry time:1day()
        const token = jwt.sign({
            email: existingUser.email,
        },
            process.env.JWT_SECRET_KEY, //Encode the above information(only email in the token)
            { expiresIn: '86400' }//expired in 86400 second = 1 day
        );
        res.status(200).json({   //Save email and token in local storage 
            email: existingUser.email,
            token,
            message: "Login successful"
        });
    } catch {
        res.status(500).send()
    }

});

//Testing used
app.get('/protect', verifyToken, (req, res) => { //Get the token from user then decode it
    try {
        res.json({ user: req.user });
    } catch (err) {
        console.error("Protect route error:", err);
        res.status(500).json({ error: "Failed to get user data." });
    }
});
//Getting all data from user, frontend will take the data then display them
app.get('/profile1', verifyToken, async (req, res) => {  //Named:/profile, verifyToken=check if the user is authorizled
    const { email } = req.user; // Get the email from token(I only stored email into the token as an id use)
    try {
        const user = await findOneField("usersData", { email });//Find the user data from database, userData, by email and store into "user"
        if (!user) //If cant find anything(most likely it is not poosible coz the user has a verified token)
            return res.status(404).json({ error: "User not found" });//return error

        res.status(200).json({  //If not, get these data and they will be stored as "data" in the frontend(example:  const data = await response.json();)
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            owner: user.owner,
            coworker: user.coworker
        });
    } catch (err) { //catch error
        res.status(500).json({ error: "Something went wrong" });
    }
});
//For changing passowrd
app.patch('/changePassword', verifyToken, async (req, res) => {

    try {
        const { newPassword, currentPassword, confirmPassword } = req.body;
        const {email} = req.user;

        if (newPassword !== confirmPassword) {
            return res.status(401).json({ error: `New passord is not confirmed!` });
        }
        const existingUser = await findOneField("usersData", { email });
        if (!existingUser) {
            return res.status(401).json({ error: `User is not exsiting!` });
        }
        const oldHashedPassword = hashPassword(currentPassword, existingUser.salt);
        if (oldHashedPassword !== existingUser.hashedPassword) {
            return res.status(401).json({ error: `Your cureent password is incorrect!` });
        }
        //To get the secret key(64-byte, saltString)(For member)
const salt = crypto.randomBytes(64).toString('hex');
        const newHashedPassword = hashPassword(newPassword, salt);

        const result = await updateManyFieldInOneObject(
            "usersData",
            { email },
            { hashedPassword: newHashedPassword, salt: salt }
        );
        return res.status(200).json({ message: 'Password has been changed!' });
    } catch (err) {
        console.error('changePassword route error:', err);
        return res.status(500).json({ error: 'Something went wrong, please try again!' });
    }
});
//Leftside bar getting information
app.get('/profile2', verifyToken, async (req, res) => {  //Named:/profile, verifyToken=check if the user is authorizled
    const { email } = req.user; // Get the email from token(I only stored email into the token as an id use)
    try {
        const user = await findOneField("usersData", { email });//Find the user data from database, userData, by email and store into "user"
        
        if (!user) //If cant find anything(most likely it is not poosible coz the user has a verified token)
            return res.status(404).json({ error: "User not found" });//return error

        res.status(200).json({  //If not, get these data and they will be stored as "data" in the frontend(example:  const data = await response.json();)
            firstName: user.firstName,
            owner: user.owner,
            coworker: user.coworker
            
        });
    } catch (err) { //catch error
        res.status(500).json({ error: "Something went wrong" });
    }
});

//==================================End of Routes for user==========================================================//




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







