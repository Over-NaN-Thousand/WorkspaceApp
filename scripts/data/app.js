require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const {  MongoClient } = require('mongodb');
const { connectToDatabase } = require('./mongo.js');//To import connectToDatabase from mongo.js
// app and settings
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); // allow all requests.
app.use(express.json()); // define middleware to parse json

const DATABASE = "WorkspaceApp";


app.get(`/test-db`, async (req, res)=>{
    try{
        await connectToDatabase(async (client)=>{
            //Display all database files
            const databasesList = await client.db().admin().listDatabases();
            const db = client.db(DATABASE);
            const collections = await db.listCollections().toArray();
            res.status(200).json({
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

app.post("/properties", async (req, res) => {
    const newProperty = req.body;
    if (!newProperty.propertyId || !newProperty.name || !newProperty.ownerId) {
        return res.status(400).json({ message: "Missing required fields: propertyId, name, or ownerId." });
    }

    try {
        const highestPropertyId = await connectToDatabase(getHighestId, "property", "propertyId");
        newProperty.propertyId = (highestPropertyId?.propertyId || 0) + 1;

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
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});







