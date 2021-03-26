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

module.exports = router