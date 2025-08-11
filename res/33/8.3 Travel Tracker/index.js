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
  password: String(process.env.pgPwd),
  port: parseInt(process.env.port)
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("select distinct country_code from countries where country in " ;
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
