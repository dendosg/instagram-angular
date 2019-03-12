const express = require('express')
const router = express.Router()
// Load db
const db = require('../db')

router.get('/', (req, res) => {
    res.json({ a: 'admin' })
})

// Get total User
router.get('/totalUser', async (req, res) => {
    db.insta_user.count({}, (err, docs) => {
        res.json({ totalUser: docs })
    })
})
// Get top User
router.get('/top/:count', (req, res) => {
    let { count } = req.params
    db.insta_user.find({}).limit(parseInt(count)).sort({ "follower": -1 }).toArray((err, docs) => {
        res.json(docs)
    })
})
// Get Info User
router.get('/user/:username', (req, res) => {
    let { username } = req.params
    db.insta_user.find({ username: username }, (err, docs) => {
        res.json(docs)
    })
})


module.exports = router