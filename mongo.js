// First thing we need is to require the mongodb module:
const { MongoClient } = require('mongodb');

// Next, we have to set up our client and database connections:
async function connectToDataBase() {
    // I'm saving my sensitive data in a .env file.
    // Remember to run the node script with "node --env-file=.env mongo.js"

    // This is obtained from Atlas. Your connection string WILL BE DIFFERENT. This will not work if you don't replace this with your connection string!
    const uri = `mongodb+srv://${username}:${db_password}@bvccluster.qgjve.mongodb.net/?retryWrites=true&w=majority&appName=bvcCluster`;

    // let's create a new "client" to connect to the dabase:
    const client = new MongoClient(uri);

    try {
        //let's establish the connection:
        await client.connect();
        //Let's list our databases so that we know our connection is good!
        await listDatabases(client);

        const newListing = { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 };
        const multipleNewDocuments = [
        { name: "Luxury Villa", bedrooms: 5, bathrooms: 4 },
        { name: "City Apartment", bedrooms: 3, bathrooms: 2 }
        ]

        // Now I want to create a single document:
        await createListing(client, newListing);

        // First, let's see how to create multiple documents now!!!!
        await createMultipleListings(client, multipleNewDocuments); // DO NOT FORGET AWAIT!!!

        // Let's find one:
        await findOneByName(client, "Infinite Views");

        



        // How do we find an entry?????

    } catch(e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

// Now we have to invoke the function to actually create the connection!
connectToDataBase();

// This function uses our client connection to request the list of databases and log to console:

// This function uses our client connection to request the list of databases and log to console:
async function listDatabases(client) {
    const databaseList = await client.admin().listDatabases();
    console.log("databases:");
    databaseList.databases.forEach(db => {
        console.log(` - ${db.name}`);
    });
}

// This is how you'd obtain a URI-safe string:
const password = "wipmUc-2dawgu-nyrpyd";
const encodedPassword = encodeURIComponent(password);
console.log(encodedPassword);