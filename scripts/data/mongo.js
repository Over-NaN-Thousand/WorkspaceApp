require('dotenv').config();
const {  MongoClient, ObjectId } = require('mongodb');

async function connectToDatabase(callback, ...args) {
    /****************Put this code into your .env*****************
    MONGO_URI=mongodb+srv://USERNAME:PASSWORD@group8.llbev.mongodb.net/?retryWrites=true&w=majority
    *****************************************************************/
    const db_uri = process.env.MONGO_URI;
    const client = new MongoClient(db_uri);

//=========Please notice everyone if you have edited above code=================




    try {
        await client.connect();
        console.log('\nConnected to database');
        await callback(client, ...args);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        console.log('Disconnected from database\n');
    }
}


async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log('Databases:');
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

 connectToDatabase(listDatabases);   //retrieve list of databases

/*const database = "WorkspaceApp";
const collection = "properties";
const properties = [
    {
      propertyId: 1,
      name: "Acme Corp",
      address1: "123 Main St",
      address2: "Suite 400",
      postalcode: "T3G 1A1",
      city: "Calgary",
      province: "AB",
      country: "Canada",
      neighbourhood: "Downtown",
      imgFileName: "Acmeimg.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 2,
      name: "Bayview Properties",
      address1: "555 Bay St",
      address2: "Floor 8",
      postalcode: "M5J 2L3",
      city: "Toronto",
      province: "ON",
      country: "Canada",
      neighbourhood: "Financial District",
      imgFileName: "BayviewProperties.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 3,
      name: "Rocky Mountain Ventures",
      address1: "321 Summit Way",
      address2: "Suite 450",
      postalcode: "T1W 1P5",
      city: "Banff",
      province: "AB",
      country: "Canada",
      neighbourhood: "Tunnel Mountain",
      imgFileName: "RockyMountainVentures.jpg",
      ownerId: 4 // Diana
    },
    {
      propertyId: 4,
      name: "Atlantic Enterprises",
      address1: "876 Ocean Rd",
      address2: "Unit 101",
      postalcode: "B3K 5T7",
      city: "Halifax",
      province: "NS",
      country: "Canada",
      neighbourhood: "North End",
      imgFileName: "AtlanticEnterprises.jpg",
      ownerId: 4 // Diana
    },
    {
      propertyId: 5,
      name: "Sunrise Developments",
      address1: "222 Sunrise Ave",
      address2: "Penthouse",
      postalcode: "H3Z 2Y7",
      city: "Montreal",
      province: "QC",
      country: "Canada",
      neighbourhood: "Westmount",
      imgFileName: "SunriseDevelopments.jpg",
      ownerId: 72345 // Evelyn
    },
    {
      propertyId: 6,
      name: "Maple Holdings",
      address1: "456 Oak Ave",
      address2: "Unit 12",
      postalcode: "V5K 0A1",
      city: "Vancouver",
      province: "BC",
      country: "Canada",
      neighbourhood: "Hastings-Sunrise",
      imgFileName: "MapleHoldings.jpg",
      ownerId: 72345 // Evelyn
    },
    {
      propertyId: 7,
      name: "Prairie Investments",
      address1: "789 Prairie Dr",
      address2: "Building 3",
      postalcode: "S7K 3J6",
      city: "Saskatoon",
      province: "SK",
      country: "Canada",
      neighbourhood: "River Heights",
      imgFileName: "PrairieInvestments.jpg",
      ownerId: 67890 // George
    },
    {
      propertyId: 8,
      name: "Northern Lights Realty",
      address1: "101 Polar Bear Ln",
      address2: "Suite 200",
      postalcode: "X0A 0H0",
      city: "Iqaluit",
      province: "NU",
      country: "Canada",
      neighbourhood: "Apex",
      imgFileName: "NorthernLightsRealty.jpg",
      ownerId: 67890 // George
    },
    {
      propertyId: 9,
      name: "Capital Hill Properties",
      address1: "111 Parliament St",
      address2: "Office 30",
      postalcode: "K1A 0A9",
      city: "Ottawa",
      province: "ON",
      country: "Canada",
      neighbourhood: "Centretown",
      imgFileName: "CapitalHillProperties.jpg",
      ownerId: 34567 // Ian
    },
    {
      propertyId: 10,
      name: "Forest View Holdings",
      address1: "890 Cedar Dr",
      address2: "Cabin 2",
      postalcode: "E2K 4J8",
      city: "Saint John",
      province: "NB",
      country: "Canada",
      neighbourhood: "Millidgeville",
      imgFileName: "ForestViewHoldings.jpg",
      ownerId: 34567 // Ian
    },    
        {
      propertyId: 11,
      name: "Summit Tower",
      address1: "456 Mountain Rd",
      address2: "Floor 10",
      postalcode: "T2P 3K4",
      city: "Calgary",
      province: "AB",
      country: "Canada",
      neighbourhood: "Beltline",
      imgFileName: "SummitTower.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 12,
      name: "Harbor Plaza",
      address1: "789 Seaside Blvd",
      address2: "Suite 250",
      postalcode: "V6C 1X8",
      city: "Vancouver",
      province: "BC",
      country: "Canada",
      neighbourhood: "Coal Harbour",
      imgFileName: "HarborPlaza.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 13,
      name: "Maple Business Center",
      address1: "100 Maple Ave",
      address2: "Unit 5",
      postalcode: "M4J 1A5",
      city: "Toronto",
      province: "ON",
      country: "Canada",
      neighbourhood: "East York",
      imgFileName: "MapleBusinessCenter.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 14,
      name: "Sunset Offices",
      address1: "222 Sunset Drive",
      address2: "Building C",
      postalcode: "H3G 2P9",
      city: "Montreal",
      province: "QC",
      country: "Canada",
      neighbourhood: "Downtown",
      imgFileName: "SunsetOffices.jpg",
      ownerId: 59715 // Alice
    },
    {
      propertyId: 15,
      name: "Aurora Heights",
      address1: "333 Northern Lights Rd",
      address2: "Penthouse",
      postalcode: "X0A 1H0",
      city: "Iqaluit",
      province: "NU",
      country: "Canada",
      neighbourhood: "Apex",
      imgFileName: "AuroraHeights.jpg",
      ownerId: 59715 // Alice
    }
  ];


async function createMultipleListings(client, newListings) {
    const result = await client
    .db(database)
    .collection(collection)
    .insertMany(newListings);

    console.log(`${result.insertedCount} new listings added! IDs:`);
    console.log(result.insertedIds);
}

// connectToDatabase(createMultipleListings, properties);  //add sample data properties to collection



async function deleteAllRecords(client) {
    const result = await client
        .db(database)
        .collection(collection)
        .deleteMany({}); // empty filter {} deletes all documents in the collection

    console.log(`${result.deletedCount} records deleted from the collection '${collection}' in database '${database}'.`);
}
// connectToDatabase(deleteAllRecords);  //delete all records in collection



async function deleteOneRecordByID(client, strID) {
    const recordId = new ObjectId(strID);           // created new ObjectId using string ID, this is now recordID
    
    const result = await client
        .db(database)
        .collection(collection)
        .deleteOne({ _id: recordId });  // used object ID to make sure we are deleting the correct record

    console.log(`Deleted ${result.deletedCount} record with _id: ${recordId}`);
}
// connectToDatabase(deleteOneRecordByID, "67df9e61b8b7b6d0e6984ab7");  //delete one record by id


async function deleteOneRecordWithFieldVal(client, strField, strValue) {
  const result = await client
      .db(database)
      .collection(collection)
      .deleteOne({ [strField]: strValue });  //putting brackets around strField makes it computed field
  console.log(`Deleted ${result.deletedCount} record with ${strField}: ${strValue}`);
}
// connectToDatabase(deleteOneRecordWithFieldVal,"name", "Sunset Offices");  //delete one record by field and value


async function deleteOneRecord(client, filter) {
  const result = await client
      .db(database)
      .collection(collection)
      .deleteOne(filter);
  console.log(`Deleted ${result.deletedCount} record with filter: ${JSON.stringify(filter)}`);
}
// connectToDatabase(deleteOneRecord, {neighbourhood: "East York", city: "Toronto"});  //delete by multiple fields
// connectToDatabase(deleteOneRecord, { _id: new ObjectId("67df9e61b8b7b6d0e6984ab6") }); //delete by ObjectId type

async function updateManyRecords(client, filter, updates) {
  const result = await client
      .db(database)
      .collection(collection)
      .updateMany(filter, { $set: updates }); // dynamically apply all updates

  console.log(`Matched ${result.matchedCount} record(s). Updated ${result.modifiedCount} record(s) with filter: ${JSON.stringify(filter)}, updates: ${JSON.stringify(updates)}`);
}
// connectToDatabase(updateManyRecords, {name: "Harbor Plaza", city:"Vancouver"}, {neighbourhood: "Coal Harbour", name:"Harbour Plaza"});



async function countRecords(client) {
    const count = await client
        .db(database)
        .collection(collection)
        .countDocuments(); // counts all documents (what we call rows in SQL) in the collection (what we call tables in SQL)

    console.log(`There are ${count} record(s) in the '${collection}' collection of the '${database}' database.`);
}

// connectToDatabase(countRecords);  //count all records in collection*/