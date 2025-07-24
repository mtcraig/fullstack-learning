import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: "Enter your name:"
  });
});

app.post("/submit", (req, res) => {
  const nLetters = req.body["fName"].length + req.body["lName"].length;
  res.render("index.ejs", {
    title: `Your name has ${nLetters} letters!`
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
