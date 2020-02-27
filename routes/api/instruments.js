const express = require('express')
const router = express.Router()

// Instrument Model
const Instrument = require('../../models/Instrument')

router.get('/', (req, res) => {
  Instrument.find()
    .sort({ date: -1 })
    .then(instruments => res.json(instruments))
})

router.get('/currency', (req, res) => {
  Instrument.find({'type': 'currency'})
    .then(instruments => res.json(instruments))
})
router.get('/notcurrency', (req, res) => {
  Instrument.find({'type': {"$nin": ["currency"]} })
    .then(instruments => res.json(instruments))
})

router.get('/ricnotincurrencydedups', (req, res) => {
  Instrument.aggregate([
    {$match: { 
           'type': {"$nin": ["currency"]},
           '_id': {"$exists": true}
           }
   },
    { $group: {
      _id: { "code": "$code.ric"},
      "instrument_id": {$addToSet:"$_id"},
           count: {$sum: 1}
       }
    },
       {$match: { 
           count: {"$gt": 1}
           }
   },
       {$sort: {
           count: -1
           }
       }
   ])
   .then(instruments => res.json(instruments))
})

router.post('/', (req, res) => {
  const newArticle = new Article({
    category: req.body.category,
    subject: req.body.subject,
    body: req.body.body,
    source: req.body.source,
    date: req.body.date,
    poster: req.body.poster,
    vote: req.body.vote
  })
  newArticle.save().then(article => res.json(article))
})

module.exports = router