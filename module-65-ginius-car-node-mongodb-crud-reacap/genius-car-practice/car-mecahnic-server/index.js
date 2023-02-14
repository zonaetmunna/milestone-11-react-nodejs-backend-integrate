const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config()


const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
     res.send('hi every One');
})

// database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fuuny.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
     try {
          await client.connect();
          console.log('connected database');
          const database = client.db('practice-car');
          const productCollection = database.collection('product');

          // POST API
          app.post('/products', async (req, res) => {
               const product = req.body;
               const result = await productCollection.insertOne(product)
               console.log(result);
               res.send(result);
          })
     }
     finally {

     }
}
run().catch(console.dir);


app.listen(port, () => {
     console.log('listing this port');
})