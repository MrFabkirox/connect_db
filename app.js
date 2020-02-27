const express = require('express')
const app = express()
const router = express.Router()

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const instruments = require('./routes/api/instruments')

// bodyparser middleware
app.use(bodyParser.json())
 
// atlas db
mongoose.connect(
  'mongodb+srv://user:'
      + 'pwd'
      + '@tigernodesandreact-4kfsd.mongodb.net/', {
    dbName: 'tigernodesandreact',
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(() => console.log('Mongodb Atlas connected'))
.catch(err => console.log(err))

mongoose.Promise = global.Promise;

// Use Routes
router.get('/', (req, res) => {
  req.end('route / ')
})

app.use('/api/instruments', instruments)


module.exports = app