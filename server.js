// Requires:
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {  MongoClient } = require('mongodb');

// app and settings
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); // allow all requests.
app.use(express.json()); // define middleware to parse json

const DATABASE = "WorkspaceApp";







// CRUD operations for PROPERTY
app.post("/properties", async (req, res) => {
    const newProperty = req.body;

    if (!newProperty.name || !newProperty.ownerId)  // make sure all required fields are provided
        return res.status(400).json({ message: "Missing required fields: propertyId, name, or ownerId." });

    try {
        const highestPropertyId = await connectToDatabase(getHighestId,"properties","propertyId"); //get current highest propertyId, we'll add 1
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





//CRUD for WORKSPACES
app.post("/workspaces", async (req, res) => {
    const newWorkspace = req.body;
    console.log("New workspace data:", newWorkspace); // For debugging
    // check that required fields were provided
    if (!newWorkspace.propertyId || !newWorkspace.workspaceName || !newWorkspace.ownerId) {
        return res.status(400).json({ message: "Missing required fields: propertyId, workspaceName, or ownerId." });
    }
    

    try {
        // check that property is valid
        const propertyExists = await connectToDatabase(async (client) => {
            return await client
                .db(DATABASE)
                .collection("properties")
                .findOne({ propertyId: newWorkspace.propertyId });
        });
        
        if (!propertyExists) {
            return res.status(400).json({ message: "Invalid propertyId provided. Property does not exist." });
        }

        // get highest workspaceID then add 1
        const highestWorkspaceId = await connectToDatabase(getHighestId, "workspaces", "workspaceID");
        newWorkspace.workspaceID = (highestWorkspaceId?.workspaceID || 0) + 1;

        // add new workspace
        const result = await connectToDatabase(async (client) => {
            return await client
                .db(DATABASE)
                .collection("workspaces")
                .insertOne(newWorkspace);
        });

        if (result.acknowledged) {
            res.status(201).json({ message: "Workspace created successfully.", workspace: newWorkspace });
        } else {
            res.status(500).json({ message: "Failed to create workspace." });
        }
    } catch (error) {
        console.error("Error creating workspace:", error);
        res.status(500).json({ message: "An error occurred while creating the workspace." });
    }
});

app.get("/workspaces", async (req, res) => {
    try {
        const filters = {};
        //AL : !discovery! HTTP headers are case insensitive but JavaScript's object (like in Express.js), all header keys are automatically converted to lowercase. 
        const rawOwnerId = req.headers["ownerid"] || req.query.ownerId;
        if (rawOwnerId) {
            const ownerId = Number(rawOwnerId); 
            if (!isNaN(ownerId)) {
                filters.ownerId = ownerId;
            } else {
                console.error("Invalid ownerId provided:", ownerId);
                return res.status(400).json({ message: "Invalid ownerId format." });
            }
        }
        
        const workspaceName = req.headers["workspacename"] || req.query.workspaceName;
        if (workspaceName) 
            filters.workspaceName = { $regex: workspaceName, $options: "i" }; // case-insensitive regex

        const workspaceType = req.headers["workspacetype"] || req.query.workspaceType;
        if (workspaceType)
            filters.workspaceType = workspaceType;

        const leaseTerm = req.headers["leaseterm"] || req.query.leaseTerm;
        if (leaseTerm)
            filters.leaseTerm = leaseTerm;

        const minSqFt = Number(req.headers["minsqft"] || req.query.minSqFt);
        const maxSqFt = Number(req.headers["maxsqft"] || req.query.maxSqFt);
        if (!isNaN(minSqFt) || !isNaN(maxSqFt)) 
            filters.sqFt = buildMinMaxFilter(minSqFt, maxSqFt); // buildMinMaxFilter is a helper function to create the filter

        const minSeatCapacity = Number(req.headers["mincapacity"] || req.query.minCapacity);
        const maxSeatCapacity = Number(req.headers["maxcapacity"] || req.query.maxCapacity);
        if (!isNaN(minSeatCapacity) || !isNaN(maxSeatCapacity))
            filters.seatCapacity = buildMinMaxFilter(minSeatCapacity, maxSeatCapacity);

        const minPrice = Number(req.headers["minprice"] || req.query.minPrice);
        const maxPrice = Number(req.headers["maxprice"] || req.query.maxPrice);
        if (!isNaN(minPrice) || !isNaN(maxPrice)) 
            filters.price = buildMinMaxFilter(minPrice, maxPrice);

        const amenities = req.headers["amenities"] || req.query.amenities;
        if (amenities) {
            filters.amenities = { $all: [].concat(amenities) }; // make sure amenities is always an array
        }

        console.log("Filters:", filters); // For debugging

        const workspaces = await connectToDatabase(getWorkspacesWithProperties, filters);
        res.status(200).json({ workspaces });
        console.log("Retreived number of workspaces:", workspaces.length); // For debugging
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        res.status(500).json({ message: "An error occurred while fetching workspaces." });
    }
});








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








app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






/************************************************************************
 * Let's declare our functions down here and keep the logic up top.     *
 ************************************************************************/






//AL: this wrapper function takes care of connecting to the database, calling the function we want to execute, error handling, and closing the connection afterwards.
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
}





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
