const express = require('express')
const _ = require('lodash')

const router = express.Router()
const Instagram = require('../lib/InstagramApi')
const { insert_user, insert_comment } = require('../function')
router.post('/', async (req, res) => {
    let { cookie, input, after } = req.body
    console.log(input, 'by', cookie.slice(-15))
    if (!input) {
        res.status(403).json({ msg: 'Vui long nhap input' })
        return null
    }
    let client = new Instagram({ cookie })
    let data = await client.getLiker({ shortcode: input, after })
    data.data.forEach(liker => {
        insert_user({
            _id: liker.id,
            username: liker.username,
            full_name: liker.full_name,
            profile_pic_url: liker.profile_pic_url,
            is_verified: liker.is_verified
        })
    });
    res.json(data)
})
module.exports = router