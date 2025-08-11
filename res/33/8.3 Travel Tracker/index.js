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

// fetch the current list of visited countries
async function checkVisited() {
  const result = await db.query("select distinct country_code from visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  // get new country request and fetch the latest list of visited countries
  const newCountry = req.body["country"].trim();
  const countries = await checkVisited();
  console.log("New country to add:", newCountry);
  console.log("Visited countries:", countries);

  // if no country is provided, return an error message
  if (!newCountry) {
    console.log("No country provided");
    res.render("index.ejs", { countries: countries, total: countries.length, error: "No country provided, please enter one and try again" });
    return;
  }

  try {
    // attempt to get the country code from the countries table
    const getCountryCode = await db.query("select distinct country_code from countries where lower(country_name) like '%' || lower($1) || '%'", [newCountry]);
    const newCountryCode = getCountryCode.rows[0].country_code;
    console.log(newCountryCode);
    try {
      // if the country code is found, check if it already exists
      if (countries.includes(newCountryCode)) {
        // if it exists, do not add it again
        console.log("Country already visited:", newCountryCode);
        res.render("index.ejs", { countries: countries, total: countries.length, error: "Country has already been added, try again." });
        return;
      } else {
        // if it does not exist, add it to the visited countries
        console.log("Adding new country:", newCountryCode);
        await db.query("insert into visited_countries (country_code) values ($1)", [newCountryCode]);
        res.redirect("/");
      }
    } catch (err) {
      // handle any errors that occur during the insertion
      console.log("Error adding country:", err);
      res.render("index.ejs", { countries: countries, total: countries.length, error: "Error adding country. Please try again." });
      return;
    }
  } catch (err) {
    // handle the case where the country code is not found
    console.log("Country not found");
    res.render("index.ejs", { countries: countries, total: countries.length, error: "Country not found. Please try again." });
    return;
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
