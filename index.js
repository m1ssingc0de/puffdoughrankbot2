var groupId = 9153980;

require('dotenv').config()
const express = require("express");
const rbx = require("noblox.js");
const app = express();

console.log("Rank bot by missing")

const cookie = process.env.RBXCOOKIE;

app.use(express.static("public"));

async function startApp() {
  await rbx.setCookie(cookie);
  let currentUser = await rbx.getCurrentUser();
  console.log(currentUser.UserName);
}
startApp();

app.get("", (req,res) => {
  res.json("Rank Bot! - By Missing");
});

app.get("/ranker", (req, res) => {
  var User = req.params.userid;
  var Rank = req.params.rank;
  var Passkey = req.params.passkey;

  if (Passkey !== process.env.PASSKEY) {
    return res.status(403).json("Invalid passkey!");
  }
  rbx.setRank(groupId, parseInt(User), parseInt(Rank))
  res.json("Ranked!");
});

const listener = app.listen(process.env.PORT, () => {
  console.log("PORT:" + listener.address().port);
});
