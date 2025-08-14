import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import Strategy from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import dotenv from "dotenv";
dotenv.config({ path: './config/.env' });

const app = express();
const port = process.env.exPort;
const saltRounds = parseInt(process.env.bcryptSaltRounds);

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
app.use(session({
  secret: process.env.exSessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}))

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/secrets", async(req, res) => {
  if (req.isAuthenticated()) {
    const secret = await db.query("SELECT secret FROM users WHERE id = $1", [req.user.id]);
    if (secret.rows.length > 0) {
      res.render("secrets.ejs", { secret: secret.rows[0].secret });
    } else {
      res.render("secrets.ejs", { secret: "You have no secrets yet." });
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

app.get("/auth/google/secrets", passport.authenticate("google", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));

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
          const result = await db.query("INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *", [email, hash]);
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.log(err)
            }
            res.redirect("/secrets");
          });
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

app.post("/login", passport.authenticate('local', {
  successRedirect: "/secrets",
  failureRedirect: "/login"
}));


app.get("/submit", (req, res) => {
  req.isAuthenticated() ? res.render("submit.ejs") : res.redirect("/login");
});

app.post("/submit", async (req,res) => {
  const secret = req.body.secret;
  console.log("Secret sent:", secret);
  const user = req.user;
  console.log("User:", user);
  if (!user) {
    return res.status(401).send("You must be logged in to submit a secret.");
  }
  try {
    const result = await db.query("UPDATE users SET secret = $2 WHERE id = $1 RETURNING secret", [user.id, secret]);
    console.log("Secret submitted:", result.rows[0]);
    res.redirect("/secrets");
  } catch (err) {
    console.error("Error submitting secret:", err);
    res.status(500).send("Error submitting secret");
  }
});

passport.use("local", new Strategy(async function verify(username, password, cb) {
  try {
    const check = await db.query("select user_email, user_password from users where user_email = $1", [username]);
    if (check.rows.length > 0) {
      const user = check.rows[0];
      console.log("User found:", user);
      if (user.user_password === "google-oauth") {
        console.log("User logged in with Google OAuth, redirecting to login.");
        return cb('User logged in with Google OAuth, redirecting to login.');
      }
      bcrypt.compare(password, user.user_password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
          return cb(err);
        } else {
          if (result) {
            console.log("Password is valid, logging in user.");
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        }
      })
    } else {
      console.log("User not found, redirecting to register.");
      return cb('User not found');
    }
  } catch (err) {
    console.error("Error logging in user:", err);
    return cb(err);
  }
}));

passport.use("google", new GoogleStrategy({
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
}, async function (accessToken, refreshToken, profile, cb) {
  console.log("Google profile:", profile);
  try {
    const result = await db.query("SELECT * FROM users WHERE user_email = $1", [profile.email]);
    if (result.rows.length > 0) {
      console.log("User already exists:", result.rows[0]);
      return cb(null, result.rows[0]);
    } else {
      const newUser = {
        user_email: profile.email,
        user_password: "google-oauth" // Placeholder password
      };
      const insertResult = await db.query("INSERT INTO users (user_email, user_password) VALUES ($1, $2) RETURNING *", [newUser.user_email, newUser.user_password]);
      console.log("New user created:", insertResult.rows[0]);
      return cb(null, insertResult.rows[0]);
    }
  } catch {
    return cb(err);
  }
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
