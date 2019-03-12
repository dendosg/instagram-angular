const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const api = require("./api");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", api);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
