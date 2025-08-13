import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: './config/.env' });

const app = express();
const port = process.env.exPort;
const saltRounds = process.env.bcryptSaltRounds;

const db = new pg.Client({
  user: String(process.env.pgUser),
  host: String(process.env.pgHost),
  database: String(process.env.pgDatabase),
  password: String(process.env.pgPassword),
  port: parseInt(process.env.pgPort)
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
  const password = req.body.password
  try {
    const check = await db.query("SELECT user_email FROM users WHERE user_email = $1", [email]);
    if (check.rows.length > 0) {
      return res.status(400).send("User already exists");
    } else {
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        try {
          await db.query("INSERT INTO users (user_email, user_password) VALUES ($1, $2)", [email, hash]);
          res.render("secrets.ejs");
        } catch (err) {
          console.error("Error inserting user:", err);
          return res.status(500).send("Error registering user");
        }
      } catch (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Error hashing password");
      }
    }
  } catch (err) {
    console.error("Error checking user existence:", err);
    return res.status(500).send("Error checking user existence");
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username
  const password = req.body.password;
  try {
    const check = await db.query("select user_email, user_password from users where user_email = $1", [email]);
    if (check.rows.length > 0) {
      const user = check.rows[0];
      console.log("User found:", user);
      bcrypt.compare(password, user.user_password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return res.status(500).send("Error logging in user");
        } else {
          if (result) {
            console.log("Password is valid, logging in user.");
            res.render("secrets.ejs");
          } else {
            return res.status(401).send("Invalid password");
          }
        }
      })
    } else {
      console.log("User not found, redirecting to register.");
      return res.status(404).send("User not found, please register");
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    return res.status(500).send("Error logging in user");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
