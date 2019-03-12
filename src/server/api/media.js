const express = require("express");
const _ = require("lodash");

const router = express.Router();
const Instagram = require("../lib/InstagramApi");
const { insert_user, insert_comment } = require("../function");

router.post("/", async (req, res) => {
  let { cookie, input, after, type } = req.body;
  console.log(input, "by", cookie.slice(-15));
  if (!input) {
    res.status(403).json({ msg: "Vui long nhap input" });
    return null;
  }
  let client = new Instagram({ cookie });
  let data = [];
  switch (type) {
    case "user":
      data = await client.get_media_by_user({ userId: input, after });
      break;
    case "user_tagged":
      data = await client.get_media_tagged_by_user({ userId: input, after });
      break;
    case "hashtag":
      data = await client.get_media_by_hashtag({ tag_name: input, after });
      break;
    case "location":
      data = await client.get_media_by_location({ locationId: input, after });
      break;
    default:
      break;
  }
  if (!data) return res.status(404).json({ msg: "Co loi xay ra" });
  res.status(200).json(data);
});
module.exports = router;
