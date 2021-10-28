const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jr39v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("volunteerDB");
    const eventCollection = database.collection("events");

    // GET ALL EVENTS
    app.get("/events", async (req, res) => {
      const cursor = eventCollection.find({});
      const events = await cursor.toArray();
      res.send(events);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running Volunteer Network Server");
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
