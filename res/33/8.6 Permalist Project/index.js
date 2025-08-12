import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import 'dotenv/config';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: String(process.env.user),
  host: String(process.env.host),
  database: String(process.env.database),
  password: String(process.env.password),
  port: parseInt(process.env.port)
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

async function getItems() {
  const result = await db.query("SELECT * FROM items");
  console.log(result.rows);
  return result.rows;
}

app.get("/", async (req, res) => {
  const items = await getItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const updItem = req.body.updatedItemTitle;
  const updId = req.body.updatedItemId;
  await db.query("UPDATE items SET title = ($1) WHERE id = $2", [updItem, updId]);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const delId = req.body.deleteItemId;
  await db.query("DELETE FROM items WHERE id = $1", [delId]);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
