const express = require('express')
const _ = require('lodash')

const router = express.Router()
const Instagram = require('../lib/InstagramApi')
const { insert_user, insert_comment } = require('../function')
router.post('/', async (req, res) => {
    let { cookie, input, type } = req.body
    console.log(input, 'by', cookie.slice(-15))
    if (!input) {
        res.status(403).json({ msg: 'Vui long nhap input' })
        return null
    }
    let client = new Instagram({ cookie })
    let data = await client.search({ query: input, context: type })
    // INSERT DB 
    res.status(200).json(data)
    data[type + 's'].forEach(item => {
        switch (type) {
            case 'user':
                insert_user({
                    _id: item.user.pk,
                    username: item.user.username,
                    full_name: item.user.full_name,
                    is_private: item.user.is_private,
                    profile_pic_url: item.user.profile_pic_url,
                    profile_pic_id: item.user.profile_pic_id,
                    is_verified: item.user.is_verified,
                    follower: item.user.follower_count
                })
                break;
            default:
                break;
        }
    });

})

module.exports = router