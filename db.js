const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/adoptafriend";
let client;
let db;

async function connectToDatabase() {
  try {
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,  // 5 seconds timeout
      socketTimeoutMS: 30000,         // 30 seconds socket timeout
      connectTimeoutMS: 30000,        // 30 seconds connection timeout
      maxPoolSize: 50,                // Maximum connection pool size
      retryWrites: true,              
      w: 'majority',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await client.connect();
    db = client.db();
    console.log("✅ Successfully connected to MongoDB");
    return db;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    throw error; // Re-throw to let the calling code handle it
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not connected! Please call connectToDatabase first.");
  }
  return db;
}

function closeConnection() {
  if (client) {
    return client.close();
  }
}

module.exports = {
  connectToDatabase,
  getDb,
  closeConnection
};