const { MongoClient } = require('mongodb');
require('dotenv').config();

const db_uri = process.env.MONGO_URI;
const client = new MongoClient(db_uri);

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) return cachedDb;

    try {
        await client.connect();
        const db = client.db("WorkspaceApp");
        cachedDb = db;
        console.log("Connected to WorkspaceApp database");
        return db;
    } catch (e) {
        console.error("DB connection failed:", e);
        throw e;
    }
}

module.exports = {
    connectToDatabase,
    ObjectId: require('mongodb').ObjectId
};
