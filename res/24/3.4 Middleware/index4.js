import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var genBandName = '';

app.use(bodyParser.urlencoded({ extended: true }));

function generateBandName (req, res, next) {
  genBandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(generateBandName)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  res.send(`<h1>Your band name is:</h1><h2>${genBandName}!</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
