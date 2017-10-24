const path = require('path')
const fs = require('fs')
const splitca = require('split-ca')

// ssl private key and crt certificate
const privateKey = fs
  .readFileSync(path.join(__dirname, './credentials/ssl.key'))

const certificate = fs
  .readFileSync(path.join(__dirname, './credentials/ssl.crt'))

// https credentials
const credentials = {
  ca: splitca(path.join(__dirname, './credentials/ssl.ca-bundle')),
  key: privateKey,
  cert: certificate
}

module.exports = {
  credentials
}
