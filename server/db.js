const knex = require('knex')
const config = require('../knexfile').development
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

function addTrade({ user, cryptoSent, coinsSent, cryptoReceived, coinsReceived }, db = database) {
  const userId = getUserId(user)
  const cryptoSentId = getCryptoId(cryptoSent)
    .then(res => {
      const cryptoId = res[0].id
      return cryptoId
    })
  const cryptoReceivedId = getCryptoId(cryptoReceived)

  updateCryptoSent(userId, cryptoSentId, coinsSent)
    .then(() => updateCryptoReceived(userId, cryptoReceivedId, coinsReceived))
}

function addTradeNewCoin({ user, cryptoSent, coinsSent, cryptoReceived, coinsReceived }, db = database) {
  const userId = getUserId(user)
  const cryptoSentId = getCryptoId(cryptoSent)
  const cryptoReceivedId = getCryptoId(cryptoReceived)

  updateCryptoSent(userId, cryptoSentId, coinsSent)
    .then(() => checkCryptoExists(cryptoReceived))
    .then(res => {
      if (res.length === 0) addCrypto(cryptoReceived, userId).then(() => updateCryptoReceived(userId, cryptoReceivedId, coinsReceived))
      else updateCryptoReceived(userId, cryptoReceivedId, coinsReceived)
    })
}

module.exports = {
  getUsers,
  getUsername,
  getCrypto,
  addTrade,
  addTradeNewCoin
}