const express = require("express");
const router = express.Router();
const Instagram = require("./lib/InstagramApi");
const db = require("./db");
// http://localhost:8080/api
router.post("/", async (req, res) => {
  if (!req.body) return;

  const {
    cookie,
    input,
    after,
    type,
    latitude,
    longitude,
    context
  } = req.body;

  if (!type) return res.json({ msg: "Vui long cung cap type" });
  if (!input && type !== 'GET_MY_PROFILE' && type !== 'GET_STORIES') return res.json({ msg: "Vui long cung cap input" });
  if (!cookie) return res.json({ msg: "Vui long cung cap cookie" });
  const client = new Instagram({ cookie });
  let data = [];
  switch (type) {
    case "GET_MY_PROFILE":
      data = await client.getProfile();
      break;
    case "GET_COMMENT":
      data = await client.getComment({ shortcode: input, after });
      break;
    case "GET_FOLLOWER":
      data = await client.getFollowers({ userId: input, after: after });
      break;
    case "GET_FOLLOWING":
      data = await client.getFollowings({ userId: input, after: after });
      break;
    case "GET_USER_BY_USERNAME":
      data = await client.getUserByUsername({ username: input });
      break;
    case "GET_USER_BY_ID":
      data = await client.getUserById({ userId: input });
      break;
    case "GET_MEDIA":
      data = await client.getMediaByShortcode({ shortcode: input });
      break;
    case "GET_LIKE":
      data = await client.getLiker({ shortcode: input, after });
      break;
    case "GET_MEDIA_OF_USER":
      data = await client.get_media_by_user({ userId: input, after });
      break;
    case "GET_MEDIA_TAGGED_OF_USER":
      data = await client.get_media_tagged_by_user({ userId: input, after });
      break;
    case "GET_HASHTAG_INFO":
      data = await client.getMediaFeedByHashtag({ hashtag: input });
      break;
    case "GET_MEDIA_OF_HASHTAG":
      data = await client.get_media_by_hashtag({ tag_name: input, after });
      break;
    case "GET_TOP_MEDIA_OF_HASHTAG":
      data = await client.get_media_by_hashtag_top_posts({
        tag_name: input
      });
      break;
    case "GET_LOCATION_INFO":
      data = await client.getMediaFeedByLocation({ locationId: input });
      break;
    case "GET_MEDIA_OF_LOCATION":
      data = await client.get_media_by_location({ locationId: input, after });
      break;
    case "GET_TOP_MEDIA_OF_LOCATION":
      data = await client.get_media_by_location_top_posts({
        locationId: input
      });
      break;
    case "LOCATION_SEARCH":
      data = await client.locationSearch({
        query: input,
        latitude,
        longitude
      });
      break;
    case "SEARCH":
      data = await client.search({
        query: input,
        context //hashtag || place || user || blended
      });
      break;
    case "GET_STORIES":
      data = await client.getStories();
      break;
    case "GET_STORIES_BY_IDS":
      data = await client.getStoriesByIds({ reel_ids: input });
      break;
    default:
      console.log("DEFAULT CMNR");
      break;
  }
  console.log('datatata', data)
  return res.json(data);
});

router.post("/upload",async (req,res)=>{
  if (!req.body) return;

  const {
    cookie,
    photoUrl,
    caption
  } = req.body;
  const client = new Instagram({ cookie });
  const data = await client.uploadPhoto({ photo: photoUrl, caption })
  res.json(data)
})
// Add an account
// http://localhost:8080/api/account
router.post("/account", (req, res) => {
  const { cookie, user } = req.body;
  if (!cookie) return res.json({ statusCode: 400, msg: "Provide cookie" });
  const account = { cookie, user, updatedTime: new Date() };
  db.accounts.insert(account, (err, docs) => {
    if (err) return res.json({ statusCode: 400, msg: err });
    res.json({ statusCode: 200, msg: docs });
  });
});
// Get all account
// http://localhost:8080/api/account
router.get("/account", (req, res) => {
  db.accounts.find({}, function (err, docs) {
    if (err) return res.json({ statusCode: 400, msg: err });
    res.json({ statusCode: 200, msg: docs });
  });
});

router.get("/test", (req, res) => {
  res.json({ a: "test" });
});

module.exports = router;
