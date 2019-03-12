const express = require("express");
const _ = require("lodash");

const router = express.Router();
const Instagram = require("../lib/InstagramApi");
const { insert_user, insert_comment } = require("../function");

router.post("/", async (req, res) => {
  let { cookie, input, after, type } = req.body;
  console.log(input, "by", cookie.slice(-15));
  if (!input) return res.status(403).json({ msg: "Vui long nhap input" });
  let client = new Instagram({ cookie });
  let data = [];
  switch (type) {
    case "follower":
      data = await client.getFollowers({ userId: input, after: after });
      break;
    case "following":
      data = await client.getFollowings({ userId: input, after: after });
      break;
    default:
      break;
  }
  if (!data.data.length) return res.status(404).json({ msg: "Co loi xay ra" });
  res.status(200).json(data);
  data.data.forEach(item => {
    insert_user({
      _id: item.id,
      username: item.username,
      full_name: item.full_name,
      profile_pic_url: item.profile_pic_url,
      is_verified: item.is_verified
    });
  });
});
module.exports = router;
