const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
     res.send('hi every one');

})

const users = [
     { id: "0", name: "munna", email: "munna@gmail.com", phone: "00080808080" },
     { id: "1", name: "zonaer", email: "zoner@gmail.com", phone: "00080808080" },
     { id: "2", name: "pagaol", email: "pagla@gmail.com", phone: "00080808080" }
]

app.get('/users', (req, res) => {
     res.send(users);
})
// dynamic param
app.get('/users/:id', (req, res) => {
     const id = req.params.id;
     const user = users[id];
     res.send(user);
})
// dynamic search query
app.get('/users', (req, res) => {
     const search = req.query.search;
     if (search) {
          const searchResult = users.filter(user => user.name.toLowerCase().includes(search));
          res.send(searchResult);
     }
     else {
          res.send(search)
     }


})

app.post('/users', (req, res) => {
     const newUser = req.body;
     newUser.id = users.length;
     users.push(newUser);
     console.log('hitting the post');
     res.json(newUser);
})

app.listen(port, () => {
     console.log('listing this port', port)
})