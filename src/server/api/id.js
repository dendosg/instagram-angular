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
    let data
    type == 'username' ?
        data = await client.getUserByUsername({ username: input })
        :
        data = await client.getUserById({ userId: input })
    res.status(data.statusCode).json(data.msg)
    if (data.statusCode == 200) {
        let item = data.msg
        insert_user({
            biography: item.biography,
            following: item.edge_follow.count,
            follower: item.edge_followed_by.count,
            posts: item.edge_owner_to_timeline_media.count,
            website: item.external_url,
            full_name: item.full_name,
            _id: item.id,
            is_private: item.is_private,
            is_verified: item.is_verified,
            profile_pic_url_hd: item.profile_pic_url_hd,
            username: item.username
        })
    }
})

module.exports = router