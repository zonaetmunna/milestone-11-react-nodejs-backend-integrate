const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

// db information
// user: mongodbUser2
//pass: gs7iS3WzepkzM1za


const uri = "mongodb+srv://mongodbUser2:gs7iS3WzepkzM1za@cluster0.nn9d9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
     try {
          await client.connect();
          const database = client.db('webMaster');
          const userCollection = database.collection('users');

          // post api
          app.post('/users', async (req, res) => {
               const result = req.body;
               const user = await userCollection.insertOne(result);
               console.log('hitting post', req.body);
               res.send(user)
          })
          // get api
          app.get('/users', async (req, res) => {

               const cursor = userCollection.find({})
               const users = await cursor.toArray();
               console.log('user show');
               res.send(users)
          })
          // find single api
          app.get('/users/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };
               const user = await userCollection.findOne(query)
               res.send('send api', user)
          })

          // delete api
          app.delete('/users/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };
               const result = await userCollection.deleteOne(query);
               console.log('delete');
               res.json(user)
          })

     }
     finally {
          // await client.close();
     }

}
run().catch(console.dir);



// get api
app.get('/', (req, res) => {
     res.send('hi every one');
})


// listing port
app.listen(port, () => {
     console.log('listing the port', port)
})