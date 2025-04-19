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
let user = {};
app.post('/api/users', (req, res) => {
  user.username = req.body.username
  user._id = new ObjectId()
  user.logs = []
  res.json({
    username: user.username,
    _id: user._id
  })
});

// exercise
let exercises = {}
app.post('/api/users/:_id/exercises', (req, res) => {
  exercises._id = user._id,
  exercises.username = user.username,
  exercises.date = new Date(req.body.date).toDateString(),
  exercises.duration = req.body.duration,
  exercises.description = req.body.description
  user.logs.push(exercises)
  res.json(exercises)
})

// logs
app.get('/api/users/:_id/logs?', (req, res) => {
  console.log(user)
  res.json({
      _id: user._id,
      username: user.username,
      count: user.logs.length,
      log: user.logs
    }
  )
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
