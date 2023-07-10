const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB configuration
const mongoURI =
  "mongodb+srv://boulada952:luzcRmNI5twoRuwc@flaskdb.dsyoyl2.mongodb.net/"; // Replace with your MongoDB URI
const dbName = "QuotesDB"; // Replace with your database name
const collectionName = "Quotes"; // Replace with your collection name

// GET route - Retrieve all messages from the database
app.get("/api/data", async (req, res) => {
  const client = new MongoClient(mongoURI);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const query = req.query.q; // Assuming you pass the search query as a query parameter, e.g., /api/data?q=searchValue

    let messages;
    if (query) {
      // Find messages that match the query: original way below
      // messages = await collection.find({ fName: query }).toArray();

      // Find a specific message by ID
      const message = await collection.findOne({ fName: query });
      messages = {
        fName: message.fName,
        lName: message.lName,
        email: message.email,
        mobileNum: message.mobileNum,
      };
    } else {
      // Retrieve all messages: original way below
      // messages = await collection.find().toArray();
      
      const allMessages = await collection.find().toArray();
      messages = allMessages.map((message) => ({
        fName: message.fName,
        lName: message.lName,
        email: message.email,
        mobileNum: message.mobileNum,
      }));
    }

    res.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ message: "Error retrieving messages" });
  } finally {
    client.close();
  }
});

// POST route - Store a message in the database
app.post("/api/data", async (req, res) => {
  const client = new MongoClient(mongoURI);

  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const message = req.body;

    await collection.insertOne(message);
    res.json({ message: "Message stored in the database" });
  } catch (error) {
    console.error("Error storing message:", error);
    res.status(500).json({ message: "Error storing message" });
  } finally {
    client.close();
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
