const express = require('express')

const router = express.Router()

const db = require('../db')

router.get('/', (req, res) => {
    const { name } = req.query

    db.getUsername(name)
        .then(username => {
            db.getCrypto(name)
                .then(data => {
                    const viewData = {
                        username,
                        data
                    }
                    res.send(viewData)
                })
        })
        .catch(err => console.log(err.message))
})

router.put('/trade', (req, res) => {
    try {
        db.addTrade(req.body)

        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

router.post('/trade/new', (req, res) => {
    try {
        db.addTradeNewCoin(req.body)

        res.sendStatus(200)
    } catch {
        res.sendStatus(500)
    }
})

module.exports = router