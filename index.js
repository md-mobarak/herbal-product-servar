const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 4000;
require('dotenv').config()

// bdHerbal
// oBE3tGLww5psnwsI
app.use(express.json())
app.use(cors())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jdq0ank.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const productCollection = client.db('bdHerbal').collection('product')


        app.get('/product', async (req, res) => {
            const product = await productCollection.find().toArray()
            res.send(product)

        })

        app.post('/AddProduct', async (req, res) => {
            const data = req.body;
            const result = await productCollection.insertOne(data)
            res.send(result)
        })

        app.delete('/product/:id', async (req, res) => {
            const { id } = req.params;
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query)
            res.send(result)
        })


    }

    finally {


    }
}

run().catch(console.dir);
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})