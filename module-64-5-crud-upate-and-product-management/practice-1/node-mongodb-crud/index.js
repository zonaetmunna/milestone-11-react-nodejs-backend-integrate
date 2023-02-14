const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');


const app = express();
const port = 5001;

// middleware
app.use(cors());
app.use(express.json());

// database
// user: mongodbUser2
//pass: gs7iS3WzepkzM1za
const uri = "mongodb+srv://mongodbUser2:gs7iS3WzepkzM1za@cluster0.nn9d9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
     try {
          await client.connect();
          const database = client.db("practice");
          const userCollection = database.collection('users');
          // post api / create operation
          app.post('/users', async (req, res) => {
               const inputUser = req.body;
               const result = await userCollection.insertOne(inputUser)
               console.log('new user ')
               res.send(result);
          })

          // get api / read operation
          app.get('/users', async (req, res) => {
               const cursor = userCollection.find({});
               const result = await cursor.toArray();
               console.log('show user ');
               res.send(result)
          })

          // get api for singleUser /find operation
          app.get('/users/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };
               const result = await userCollection.findOne(query);
               res.send(result);
          })

          // get api for single user / delete operation
          app.get('/users/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };
               const result = await userCollection.deleteOne(query);

               res.json(result);
          })

          // put api / update operation
          app.put('/users/:id', async (req, res) => {
               const id = req.params.id;
               const updateUser = req.body;
               const filter = { _id: ObjectId(id) };
               const options = { upsert: true };
               const updateDoc = {
                    $set: {
                         name: updateUser.name,
                         email: updateUser.email
                    }
               }
               const result = await userCollection.updateOne(filter, updateDoc, options);
               res.send(result);
          })
     }
     finally {
          // await client.close();
     }

}
run().catch(console.dir);




app.get('/', (req, res) => {
     res.send('wow you are right')
})

app.listen(port, (req, res) => {
     console.log('listing the port', port);
})