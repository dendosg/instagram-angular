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
    let data = await client.getMediaByShortcode({ shortcode: input })
    if (data == 404) {
        console.log('Shortcode khong hop le:', input)
        res.status(404).json({ msg: 'Shortcode khong hop le' })
        return
    }
    res.json(data)

})

router.post('/upload', async (req, res) => {
    let { cookie, owner, photo, location } = req.body
    console.log(req.body)
    let client = new Instagram({ cookie })
    let caption = `
    📷 ${owner}
    location: ${location}
    #likeforfollow #likeforlikes #like4likes #like4follow #like4tags #liker #likeme #tagsforfollow #tagsforlikesapp #likeit #likers #likeforlikealways #likeforlikeback #likeforfollowers #likesforfollow #likeforlikealways #likeforlikeback #likeforfollowers #likeforme #likeaboss #like4likeback #likethis #likebackalways #like4tags #liked`
    photo = 'https://instagram.fdad2-1.fna.fbcdn.net/vp/99fdbc0fcd14e3f01f6558dd0e7c3774/5BF1BB3E/t51.2885-15/e35/37417312_2057422770969868_4131624462757920768_n.jpg'
    caption = 'test'
    await client.uploadPhoto({ photo, caption })
    res.json({ aaa: 333 })
    console.log('Upload Done')
})

router.get('/test', async (req, res) => {
    let cookie = 'mid=Wz90DwAEAAHVBUyLGyXbnA5prjPv; mcd=3; csrftoken=VWMNM45lNZ9BhKrhhHIVV2JgzDB36t5H; shbid=16469; ds_user_id=7921756219; sessionid=IGSCaa9754fc40f64448e635bd599583b08bd45352abcb3002dae30ae2f1e54dd064%3AWk9HY6bPZMChX0YbtJBKCjZJgZ9EkkqX%3A%7B%22_auth_user_id%22%3A7921756219%2C%22_auth_user_backend%22%3A%22accounts.backends.CaseInsensitiveModelBackend%22%2C%22_auth_user_hash%22%3A%22%22%2C%22_platform%22%3A4%2C%22_token_ver%22%3A2%2C%22_token%22%3A%227921756219%3AKONr8SI8ObfNucEJtoWZs8OTd0A6ulrX%3A86f1812329378f8afc7d1ee021cece77564b7fd6f45e047ed83f0781edf918df%22%2C%22last_refreshed%22%3A1530968495.5615253448%7D; rur=PRN; urlgen="{\"time\": 1530974956}:1fbqhw:ytrgfPVCuxInDuexzAki0Oru3oM"'
    let client = new Instagram({ cookie })
    let photo = 'https://dantricdn.com/2017/thu-1504399379412.jpg'
    let aaa = await client.uploadPhoto({ photo, caption: 'test caption' })

    res.json({ a: 3 })
})
module.exports = router