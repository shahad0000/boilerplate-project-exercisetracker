const express = require('express')
const app = express()
const cors = require('cors')
const { ObjectId } = require("mongodb")
require('dotenv').config()
app.use(express.json());
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// user
let users = {};
app.post('/api/users', (req, res) => {
  users.username = req.body.username
  users._id = new ObjectId()
  users.logs = []
  res.json({
    username: users.username,
    _id: users._id
  })
});

// exercise
app.post('/api/users/:_id/exercises', (req, res) => {
  const exercises = {
    _id: users._id,
    username: userusername,
    date: new Date(req.body.date).toDateString(),
    duration: req.body.duration,
    description: req.body.description
  }
  
  users.logs.push(exercises);

  res.json(exercises);
})

// logs
app.get('/api/users/:_id/logs?', (req, res) => {
  console.log(users)
  res.json({
      _id: users._id,
      username: users.username,
      count: users.logs.length,
      log: users.logs
    }
  )
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
