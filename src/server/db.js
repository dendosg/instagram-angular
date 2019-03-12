const mongojs = require("mongojs");
// kinhdomcom, ma***345
const connectionString =
  "mongodb://kinhdomcom:kinhdomcom@ds141185.mlab.com:41185/vsbg";
const collections = [
  "insta_user",
  "instag_hashtag",
  "insta_place",
  "insta_media"
];
// const db = mongojs(
//   "mongodb://issueanttech:matkhau1235@ds217671.mlab.com:17671/vsbg",
//   ["posts"]
// );

const db = mongojs(connectionString, collections);

db.on("error", function(err) {
  console.log("database error", err);
});

db.on("connect", function() {
  console.log("database connected");
});

module.exports = db;
