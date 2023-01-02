const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
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
        const categoryCollection = client.db('waveyJAM').collection('categories');
        const productCollection = client.db('waveyJAM').collection('products');


        app.get('/categories', async (req, res) => {
            const query = {}
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        });
        app.get('/categories/:id', async (req, res) => {
            const id = req.params.id;
            const query = { id: id };
            const product = await productCollection.find(query).toArray();
            res.send(product);
        })







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