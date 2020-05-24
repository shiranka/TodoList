const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const tasks = require('./api/tasks')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const db = require('./config/keys').mongoURI

mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err))

app.use('/api/tasks', tasks)
const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log('server started on port ' + PORT))