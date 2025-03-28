//Import application
require('dotenv').config();
console.log("MONGO_URI =", process.env.MONGO_URI);
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const {  MongoClient } = require('mongodb');
const { 
    connectToDatabase, 
    getHighestId, 
    createProperty, 
    readProperties, 
    updateProperty, 
    deleteProperty 
} = require('./mongo');//To import connectToDatabase from mongo.js

//Declare the app, port number
const app = express();
const PORT = process.env.PORT || 3000;

// app and settings
app.use(cors()); // allow all requests.
app.use(express.json()); // define middleware to parse json

//Define the Database's name.
const DATABASE = "WorkspaceApp";








//==========================================Keep CRUD below=========================================//

//For testing used
app.get(`/test-db`, async (req, res)=>{
    try{
        await connectToDatabase(async (client)=>{  //Connect to database first
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
//==================================CRUD for Property===================================================//
app.post("/properties", async (req, res) => {
    const newProperty = req.body;

    if (!newProperty.propertyId || !newProperty.name || !newProperty.ownerId)  // make sure all required fields are provided
        return res.status(400).json({ message: "Missing required fields: propertyId, name, or ownerId." });

    try {
        const highestPropertyId = await connectToDatabase(getHighestId,"property","propertyId"); //get current highest propertyId, we'll add 1
        newProperty.propertyId = (highestPropertyId?.propertyId || 0) + 1; // ? is the optional chaining operator, if highestPropertyId is null or undefined, it will return 0

        const result = await connectToDatabase(createProperty, newProperty);
            if (result.acknowledged) {
                res.status(201).json({ message: "Property created successfully.", property: newProperty });
            } else {
                res.status(500).json({ message: "Failed to create property." });
            }
    } catch (error) {
        console.error("Error creating property:", error);
        res.status(500).json({ message: "An error occurred while creating the property." });
    }
});

app.get("/properties", async (req, res) => {
    const filters = {};

    const ownerId = Number(req.headers["userid"] || req.query.userid); // try to get userId from headers, after that from query string
    if (!isNaN(ownerId)) {
        filters.ownerId = ownerId; 
    } else {
        console.error("Invalid ownerId provided:", ownerId);
        return res.status(400).json({ message: "Invalid ownerId format." });
    }

    const propertyName = req.headers["name"] || req.query.name;
    if (propertyName) 
        filters.name = { $regex: req.query.name, $options: "i" }; // AL: MongoDB regex similar to LIKE, i for case-insensitive

    try {
        const properties = await connectToDatabase(readProperties, filters);
        // console.dir(properties);
        res.status(200).json({ properties });
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "An error occurred while fetching properties." });
    }
});

app.put("/properties/:id", async (req, res) => {
    const propertyId = Number(req.params.id);       // get the property ID
    const updates = req.body;                       // get the updates

    if (isNaN(propertyId))
        return res.status(400).json({ message: "Invalid property ID provided." });
    

    if (!updates || Object.keys(updates).length === 0) 
        return res.status(400).json({ message: "No updates provided in request body." });
    
    try {
        const result = await connectToDatabase(updateProperty, propertyId, updates);
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Property updated successfully." });
        } else {
            res.status(404).json({ message: "Property not found or no changes were made." });
        }
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ message: "An error occurred while updating the property." });
    }
});

app.delete("/properties/:id", async (req, res) => {
    const propertyId = Number(req.params.id);

    if (isNaN(propertyId)) {
        return res.status(400).json({ message: "Invalid property ID provided." });
    }

    try {
        const result = await connectToDatabase(deleteProperty, propertyId);
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Property deleted successfully." });
        } else {
            res.status(404).json({ message: "Property not found." });
        }
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).json({ message: "An error occurred while deleting the property." });
    }
});

//==================================End of CRUD for Property===================================================//


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







