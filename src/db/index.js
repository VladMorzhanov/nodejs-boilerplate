const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const {forOwn} = require('lodash')
const debug = require('debug')('mongodb:server')
const {MONGO_URL, MONGO_TEST_URL, NODE_ENV} = require('../constants')
const models = require('../models')
const options = require('./options.json')

let MONGO_URI
if (NODE_ENV === 'development') {
  MONGO_URI = MONGO_TEST_URL
} else if (NODE_ENV === 'production') {
  MONGO_URI = MONGO_URL
} else {
  throw new Error('Closing. NODE_ENV must be provided!')
}

mongoose.connect(MONGO_URI, options)

const db = mongoose.connection

db.on('error', function (err) {
  debug(`MongoDB: ${err.message}`)
  process.kill(process.pid, 'SIGINT')
})

db.on('reconnected', function () {
  debug(`MongoDB: reconnected!`)
})

db.once('open', function () {
  if (NODE_ENV !== 'development') {
    debug(`MongoDB: connected on ${MONGO_URL}!`)
  }
})

db.on('disconnected', function () {
  if (NODE_ENV !== 'development') {
    debug('MongoDB: disconnected!')
  }
})

forOwn(models, (initModel) => initModel(db))

module.exports = db
