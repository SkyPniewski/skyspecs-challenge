const express = require("express");
const cors = require("cors");
const PORT = 3010;

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();
console.log(process.env)

const gists = require("./lib/gists");
const favorites = require("./lib/favorites");

app.get("/", (req, res) => {
  res.send("Welcome to SkySpecs!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/getUserGists", async (req, res) => {
  const result = await gists.getUserGists(req.query.username);
  res.json({gists:result});
});

app.post("/favorite", async (req, res) => {
  const result = await favorites.saveFavorite(req.body.id);
  res.json(result)
});

app.post("/unfavorite", async (req, res) => {
  const result = await favorites.removeFavorite(req.body.id);
  res.json(result)
});

app.get("/getFavorites", async(req, res) =>{
  let favs = await favorites.getFavorites();
  let result = await gists.getGists(favs);
  res.json({gists:result});
});

