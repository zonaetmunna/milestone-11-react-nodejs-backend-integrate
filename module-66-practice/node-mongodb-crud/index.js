const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()

const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
     res.send('hitting the server');
})

// database
// user : practiceUser
// pass : B32zOm1I5NaTGaGZ

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ugo5b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
     try {
          await client.connect();
          console.log('database connect')
          const database = client.db('practice-crud');
          const userCollection = database.collection('user');

          // POST api
          app.post('/user', async (req, res) => {
               const user = req.body;
               const result = await userCollection.insertOne(user);
               res.send(result);
          })

     }
     finally {
          // await client.close();
     }

}
run().catch(console.dir);



app.listen(port, () => {
     console.log('listing the port', port);
})