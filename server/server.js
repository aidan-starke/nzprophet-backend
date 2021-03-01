const path = require('path')
const express = require('express')
const server = express()

const users = require('./routes/users')
const crypto = require('./routes/crypto')

const cors = require('cors')

server.use(cors())
server.use(express.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/api/v1/users', users)
server.use('/api/v1/crypto', crypto)

module.exports = server
