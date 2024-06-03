require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  if (!client.isConnected) {
    await client.connect();
  }
  const db = client.db("ourDatabase");
  db.client = client; // Attach client to db object for later access
  return db;
}

module.exports = connectDB;
