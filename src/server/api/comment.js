const express = require("express");
const _ = require("lodash");

const router = express.Router();
const Instagram = require("../lib/InstagramApi");
const { insert_user, insert_comment } = require("../function");
router.post("/", async (req, res) => {
  let { cookie, input, after } = req.body;
  console.log(input, "by", cookie.slice(-15));
  if (!input) return res.status(403).json({ msg: "Vui long nhap input" });
  let client = new Instagram({ cookie });
  let data = await client.getComment({ shortcode: input, after });
  res.json(data);
});
module.exports = router;
