const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000

// bdHerbal
// oBE3tGLww5psnwsI
app.use(express.json())
app.use(cors())

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://bdHerbal:oBE3tGLww5psnwsI@cluster0.jdq0ank.mongodb.net/?retryWrites=true&w=majority";
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


        // app.delete('/order/:id', async (req, res) => {
        //     const { id } = req.params;
        //     const query = { _id: ObjectId(id) };
        //     const result = await userCollection.deleteOne(query)
        //     res.send(result)
        // })
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