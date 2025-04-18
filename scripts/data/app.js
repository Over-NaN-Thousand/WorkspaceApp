//Import application(For public)
//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require("path");
//const { MongoClient } = require('mongodb');


const {
    connectToDatabase,
    connectToDatabaseB,
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


const DATABASE = "WorkspaceApp";









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
//Add property
/*app.post('/addProperties', verifyToken,async (req, res) => {
    try {
        const all = await findManyField("properties", {});
        const maxId = all.reduce((max, p) => Math.max(max, p.propertyId || 0), 0);
        const newId = maxId + 1;
      const newProperty ={
        ...req.body,
        propertyId: newId,

      };

      const result = await insertOneObject("properties", newProperty);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save property' });
    }
  });

  //Display property
  app.get('/myProperty', verifyToken, async (req, res) => {
    try {
      const email = req.user.email;
      const all = await findManyField("properties", { ownerEmail: email });
  
      if (!all || all.length === 0) {
        return res.status(404).json({ message: 'No properties found' });
      }
  

      res.status(200).json(all);
    } catch (err) {
      console.error("Error in /myProperty:", err);
      res.status(500).json({ error: 'Failed to fetch property' });
    }
  });*/ //Repeated by Victor


app.post("/properties", verifyToken, async (req, res) => {
    const newProperty = req.body;

    if (!newProperty.name || !newProperty.ownerId)  // make sure all required fields are provided
        return res.status(400).json({ message: "Missing required fields: propertyId, name, or ownerId." });

    try {
        const highestPropertyId = await connectToDatabaseB(getHighestId,"properties","propertyId"); //get current highest propertyId, we'll add 1
        newProperty.propertyId = (highestPropertyId?.propertyId || 0) + 1; // ? is the optional chaining operator, if highestPropertyId is null or undefined, it will return 0

        const result = await connectToDatabaseB(createProperty, newProperty);
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

app.get("/properties", verifyToken,async (req, res) => {
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
        const properties = await connectToDatabaseB(readProperties, filters);
        // console.dir(properties);
        res.status(200).json({ properties });
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ message: "An error occurred while fetching properties." });
    }
});

app.put("/properties/:id", verifyToken,async (req, res) => {
    const propertyId = Number(req.params.id);       // get the property ID
    const updates = req.body;                       // get the updates

    if (isNaN(propertyId))
        return res.status(400).json({ message: "Invalid property ID provided." });
    

    if (!updates || Object.keys(updates).length === 0) 
        return res.status(400).json({ message: "No updates provided in request body." });
    
    try {
        const result = await connectToDatabaseB(updateProperty, propertyId, updates);
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

app.delete("/properties/:id", verifyToken,async (req, res) => {
    const propertyId = Number(req.params.id);

    if (isNaN(propertyId)) {
        return res.status(400).json({ message: "Invalid property ID provided." });
    }

    try {
        const result = await connectToDatabaseB(deleteProperty, propertyId);
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
            { expiresIn: "1d" }//expired in 86400 second = 1 day
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


app.delete('/user', verifyToken, async (req, res) => {
    const userEmail = req.headers["email"] || req.query.email;
    try {
    const result = await deleteOneObject("usersData", {email:userEmail});
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "User deleted successfully." });
        } else {
            res.status(404).json({ message: "User was not found." });
        }
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "An error occurred while deleting the user." });
    }
});



//==================================End of Routes for user==========================================================//

//==================================Routes for WorkspaceDetails===================================================//



/*app.post('/addWorkspaces', verifyToken, async (req, res) => {
  try {

    const newWorkspace = req.body;
 
    const result = await insertOneObject("workspaces", newWorkspace);
    res.status(201).json(result);
  } catch (error) {
    console.error("[ /workspaces Error]:", error);
    res.status(500).json({ error: 'Failed to save workspace' });
  }
});*/ //Repeated by Victor

//Add property
/*app.post('/properties', verifyToken,async (req, res) => {
    try {
      const newProperty = req.body;
      const result = await insertOneObject("properties", newProperty);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save property' });
    }
  });

  app.post('/workspaces', verifyToken, async (req, res) => {
    try {
      const newWorkspace = req.body;
  
      const result = await insertOneObject("workspaces", newWorkspace);
      res.status(201).json(result);
    } catch (error) {
      console.error("[ /workspaces Error]:", error);
      res.status(500).json({ error: 'Failed to save workspace' });
    }
  });*/

//==================================End of Routes for WorkspaceDetails===================================================//





//==================================Routes for WorkspaceDetails===================================================//

  app.post("/workspaces", verifyToken,async (req, res) => {

    const newWorkspace = req.body;
    console.log("New workspace data:", newWorkspace); // For debugging
    // check that required fields were provided
    if (!newWorkspace.propertyId || !newWorkspace.workspaceName || !newWorkspace.ownerId) {
        return res.status(400).json({ message: "Missing required fields: propertyId, workspaceName, or ownerId." });
    }
    

    try {
        // check that property is valid
        const propertyExists = await connectToDatabaseB(async (client) => {
            return await client
                .db(DATABASE)
                .collection("properties")
                .findOne({ propertyId: newWorkspace.propertyId });
        });
        
        if (!propertyExists) {
            return res.status(400).json({ message: "Invalid propertyId provided. Property does not exist." });
        }

        // get highest workspaceID then add 1
        const highestWorkspaceId = await connectToDatabaseB(getHighestId, "workspaces", "workspaceID");
        newWorkspace.workspaceID = (highestWorkspaceId?.workspaceID || 0) + 1;

        // add new workspace
        const result = await connectToDatabaseB(async (client) => {
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



app.get("/workspacedetails", verifyToken,async (req, res) => {

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

        const workspaces = await connectToDatabaseB(getWorkspacesWithProperties, filters);
        res.status(200).json({ workspaces });
        console.log("Retreived number of workspaces:", workspaces.length); // For debugging
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        res.status(500).json({ message: "An error occurred while fetching workspaces." });
    }
});

app.get("/workspaces", verifyToken,async (req, res) => {
    try {
        const filters = {};
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
        const workspaces = await connectToDatabaseB(getWorkspaces, filters);
        res.status(200).json({ workspaces });
        console.log("Retrieved number of workspaces:", workspaces.length); // For debugging
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        res.status(500).json({ message: "An error occurred while fetching workspaces." });
    }
});



app.put("/workspaces/:id", verifyToken,async (req, res) => {
    const workspaceId = Number(req.params.id);       // get the workspace ID
    const updates = req.body;                       // get the updates

    if (isNaN(workspaceId))
        return res.status(400).json({ message: "Invalid workspace ID provided." });
    

    if (!updates || Object.keys(updates).length === 0) 
        return res.status(400).json({ message: "No updates provided in request body." });
    
    try {
        const result = await connectToDatabaseB(updateWorkspace, workspaceId, updates);
        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Workspace updated successfully." });
        } else {
            res.status(404).json({ message: "Workspace not found or no changes were made." });
        }
    } catch (error) {
        console.error("Error updating workspace:", error);
        res.status(500).json({ message: "An error occurred while updating workspace." });
    }
});

app.delete("/workspaces/:id", verifyToken,async (req, res) => {
    const workspaceId = Number(req.params.id);

    if (isNaN(workspaceId)) {
        return res.status(400).json({ message: "Invalid workspace ID provided." });
    }

    try {
        const result = await connectToDatabaseB(deleteWorkspace, workspaceId);
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Workspace deleted successfully." });
        } else {
            res.status(404).json({ message: "Workspace not found." });
        }
    } catch (error) {
        console.error("Error deleting workspace:", error);
        res.status(500).json({ message: "An error occurred while deleting workspace." });
    }
});


//-------------------Public workspace route (no token needed to access)-----------------//

// Getting all data from workspaces
app.get("/publicWorkspaces",async (req, res) => {

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

        const workspaces = await connectToDatabaseB(getWorkspacesWithProperties, filters);
        res.status(200).json({ workspaces });
        console.log("Retreived number of workspaces:", workspaces.length); // For debugging
    } catch (error) {
        console.error("Error fetching workspaces:", error);
        res.status(500).json({ message: "An error occurred while fetching workspaces." });
    }
});




//==================================End of Routes for WorkspaceDetails===================================================//







//========================= Bookings API ===============================//

// POST: Create new booking
app.post('/bookings', verifyToken, async (req, res) => {
    const { workspaceName, leaseType, userEmail, startTime, endTime } = req.body;
    // Validation
    if (!workspaceName || !leaseType || !userEmail || !startTime || !endTime) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const user = await findOneField("usersData", { email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found. Please use a registered email." });
        }



        const db = await connectToDatabase();
        await db.collection("bookings").insertOne({
            workspaceName,
            leaseType,
            userEmail,
            userId: user.id,
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
app.get('/bookings',verifyToken, async (req, res) => {
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

// PUT: Update an existing booking by ID
app.put('/bookings/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { workspaceName, leaseType, userEmail, startTime, endTime } = req.body;

    // Validate
    if (!workspaceName || !leaseType || !userEmail || !startTime || !endTime) {
        return res.status(400).json({ error: "All fields are required for update" });
    }

    try {
        const db = await connectToDatabase();
        const result = await db.collection("bookings").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    workspaceName,
                    leaseType,
                    userEmail,
                    startTime,
                    endTime,
                    updatedAt: new Date()
                }
            }
        );

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: "Booking updated successfully!" });
        } else {
            res.status(404).json({ message: "Booking not found or no changes made" });
        }

    } catch (err) {
        console.error("Update booking error:", err);
        res.status(500).json({ error: "Server error while updating" });
    }
});



// DELETE: Remove a booking by ID
app.delete('/bookings/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const db = await connectToDatabase();
        const result = await db.collection("bookings").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
            res.status(200).json({ message: "Booking deleted successfully!" });
        } else {
            res.status(404).json({ message: "Booking not found" });
        }

    } catch (err) {
        console.error("Delete booking error:", err);
        res.status(500).json({ error: "Server error while deleting" });
    }
});

//===========================End of Bookings API ============================//







app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

