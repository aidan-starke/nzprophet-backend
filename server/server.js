const express = require('express')
const server = express()

const users = require('./routes/users')
const crypto = require('./routes/crypto')
const transactions = require('./routes/transactions')

const cors = require('cors')

server.use(cors())
server.use(express.json())

server.use('/api/v1/users', users)
server.use('/api/v1/crypto', crypto)
server.use('/api/v1/transactions', transactions)

module.exports = server
