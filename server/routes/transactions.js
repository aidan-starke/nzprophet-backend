const express = require('express')

const router = express.Router()

const db = require('../db')

router.get('/', (req, res) => {
    db.getTrades(req.query)
        .then(data => res.send(data))
        .catch(err => console.log(err.message))
})

router.post('/trade', (req, res) => {
    try {
        db.addTrade(req.body)

        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

router.post('/buy', (req, res) => {
    try {
        db.addBuy(req.body.params.data)

        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

module.exports = router
