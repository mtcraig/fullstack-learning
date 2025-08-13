import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: './config/.env' });

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

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username
  const password = req.body.password;
  try {
    const check = await db.query("SELECT user_email FROM users WHERE user_email = $1", [email]);
    if (check.rows.length > 0) {
      return res.status(400).send("User already exists");
    } else {
      console.log("User does not exist, proceeding with registration.");
    }
  } catch (err) {
    console.error("Error checking user existence:", err);
    return res.status(500).send("Error checking user existence");
  }
  try {
    await db.query("INSERT INTO users (user_email, user_password) VALUES ($1, $2)", [email, password]);
    res.render("secrets.ejs");
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username
  const password = req.body.password;
  try {
    const check = await db.query("select user_email from users where user_email = $1", [email]);
    if (check.rows.length > 0) {
      const user = check.rows[0];
      console.log("User found:", user);
      if (user.user_password !== password) {
        return res.status(401).send("Invalid password");
      } else {
        console.log("Password is valid, logging in user.");
        res.render("secrets.ejs");
      }
    } else {
      return res.status(401).send("Invalid username");
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).send("Error logging in user");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
