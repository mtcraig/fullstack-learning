//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// body-parser is apparently now included in express so can
// actually get away with removing that import and swapping
// bodyParser with express throughout

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var pwdValid = false;


app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

function pwdCheck (req, res, next) {
    pwdValid = (req.body["password"] === "ILoveProgramming");
    next();
}

app.use(pwdCheck);

app.post('/check', (req, res) => {
    if (pwdValid === true) {
        res.sendFile(__dirname + '/public/secret.html');
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
})

app.listen(port ,() => {
    console.log(`Listening on port ${port}`)
})