const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const InstrumentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  ric: {
    type: String,
    required: true
  },
  coderic: {
    type: String,
    required: true
  }
})

module.exports = Instrument = mongoose.model('instrument', InstrumentSchema)