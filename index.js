const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.afq9fgb.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        const sectorCollection = client.db('jobtask').collection('sectors');
        const storedCollection = client.db('jobtask').collection('stored');



        app.get('/sectors', async (req, res) => {
            const query = {}
            const cursor = sectorCollection.find(query);
            const sectors = await cursor.toArray();
            res.send(sectors);
        });

        app.put('/storing', async (req, res) => {
            const store = req.body;
            const result = await storedCollection.insertOne(store);
            res.send(result);
            console.log('Data added successfully...');
        });








    } finally {

    }
}



run().catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('jobtask server is running')
})

app.listen(port, () => {
    console.log(`jobtask  server running on ${port}`);
})