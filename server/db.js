const knex = require('knex')
const config = require('../knexfile').production
const database = knex(config)

function getUsers(db = database) {
  return db('users')
    .select('name')
}

function getUsername(name, db = database) {
  return db('users')
    .where('name', name)
    .select('username')
}

function getUserId(name, db = database) {
  return db('users')
    .where('name', name)
    .select('id')
}

function getCrypto(name, db = database) {
  return db('users')
    .where('users.name', name)
    .join('user_crypto', { 'users.id': 'user_id' })
    .join('cryptos', { 'cryptos.id': 'user_crypto.crypto_id' })
    .join('images', { 'images.id': 'image_id' })
    .select('cryptos.name', 'src', 'coins_owned as coinsOwned', 'investment')
}

function getCryptoId(name, db = database) {
  return db('cryptos')
    .where('name', name)
    .select('id')
}

function checkCryptoExists(name, db = database) {
  return db('cryptos')
    .where('name', name)
    .select()
}

function addCrypto(name, userId, db = database) {
  var imageId
  var src = `./${name}.png`
  var zero = '0'

  return db('cryptos')
    .select()
    .then(res => {
      imageId = res.length + 1
    })
    .then(() => {
      return db('cryptos')
        .insert({ 'name': name, 'image_id': imageId })
    })
    .then(() => {
      return db('images')
        .insert({ 'src': src, 'crypto_id': imageId })
    })
    .then(() => {
      return db('user_crypto')
        .insert({ 'user_id': userId, 'crypto_id': imageId, 'coins_owned': zero, 'investment': zero })
    })
}

function updateCryptoSent(userId, cryptoSentId, coinsSent, db = database) {
  return db('user_crypto')
    .where({ 'user_id': userId, 'crypto_id': cryptoSentId })
    .select('coins_owned as coinsOwned')
    .then(res => {
      const sumCoinsOwned = res[0].coinsOwned - Number(coinsSent)

      return db('user_crypto')
        .where({ 'user_id': userId, 'crypto_id': cryptoSentId })
        .update('coins_owned', sumCoinsOwned)
    })
}

function updateCryptoReceived(userId, cryptoReceivedId, coinsReceived, db = database) {
  return db('user_crypto')
    .where({ 'user_id': userId, 'crypto_id': cryptoReceivedId })
    .select('coins_owned as coinsOwned')
    .then(res => {
      const sumCoinsOwned = res[0].coinsOwned + Number(coinsReceived)

      return db('user_crypto')
        .where({ 'user_id': userId, 'crypto_id': cryptoReceivedId })
        .update('coins_owned', sumCoinsOwned)
    })
}

function addTrade({ user, cryptoSent, coinsSent, cryptoReceived, coinsReceived }) {
  getUserId(user)
    .then(res => {
      let userId = res[0].id

      getCryptoId(cryptoSent)
        .then(res => {
          let cryptoSentId = res[0].id

          checkCryptoExists(cryptoReceived)
            .then(res => {
              if (res.length === 0) addCrypto(cryptoReceived, userId)
                .then(() => tradeCallback(userId, cryptoSent, cryptoSentId, coinsSent, cryptoReceived, coinsReceived))

              else tradeCallback(userId, cryptoSent, cryptoSentId, coinsSent, cryptoReceived, coinsReceived)
            })
        })
    })
}

function tradeCallback(userId, cryptoSent, cryptoSentId, coinsSent, cryptoReceived, coinsReceived, db = database) {
  getCryptoId(cryptoReceived)
    .then(res => {
      let cryptoReceivedId = res[0].id

      updateCryptoSent(userId, cryptoSentId, coinsSent)
        .then(() => updateCryptoReceived(userId, cryptoReceivedId, coinsReceived))
        .then(() => {
          var timestamp = new Date().toString().replace(/[G].*/, '')
          timestamp = timestamp.substring(0, timestamp.length - 4)

          return db('transactions')
            .insert({
              'user_id': userId, 'crypto_sent': cryptoSent, 'coins_sent': coinsSent, 'crypto_received': cryptoReceived,
              'coins_received': coinsReceived, 'timestamp': timestamp
            })
        })
    })
}

function getTrades({ user, crypto }, db = database) {
  return getUserId(user)
    .then(res => {
      let userId = res[0].id

      return db('transactions')
        .where({ 'user_id': userId, 'crypto_sent': crypto })
        .orWhere({ 'user_id': userId, 'crypto_received': crypto })
        .select('id', 'user_id as userId', 'crypto_sent as cryptoSent', 'coins_sent as coinsSent', 'crypto_received as cryptoReceived',
          'coins_received as coinsReceived', 'timestamp')
    })
}

module.exports = {
  getUsers,
  getUsername,
  getCrypto,
  addTrade,
  getTrades
}
