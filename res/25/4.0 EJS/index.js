import express from "express";
import ejs from "ejs";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;


var dType = 'weekday';
var adv = 'Get that nose to the grindstone!';

function wkTypeCheck (req, res, next) {    
    const d = (new Date()).getDay();
    if (d === 0 | d === 6) {
        dType = 'weekend';
        adv = 'Party time baybee!';
    }
    next();
}

app.use(wkTypeCheck);

app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.ejs', {
        dayType: dType,
        advice: adv
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})