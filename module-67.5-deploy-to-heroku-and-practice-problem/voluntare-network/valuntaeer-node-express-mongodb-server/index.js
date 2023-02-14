const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// database

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ugo5b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
     try {
          await client.connect();
          console.log('server connect database successfully');
          
          const database = client.db('volunteer');

          const userCollection = database.collection('user');
          const serviceCollection = database.collection('services')
          // GET api
          app.get('/services', async (req, res) => {
               const service = serviceCollection.find({});
               const services = await service.toArray();
               res.send(services);
          })

     }
     finally {
          // 
     }

}
run().catch(console.dir);


app.get('/', (req, res) => {
     res.send('hi volunteer server');
})

app.listen(port, () => {
     console.log('listing the port ', port);
})