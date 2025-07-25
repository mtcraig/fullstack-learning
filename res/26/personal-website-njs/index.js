import express from 'express';
import fs from 'fs';
import ejs from 'ejs';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function readJSON(target) {
    return JSON.parse(fs.readFileSync(`public/content/resume/${target}.json`
                ,'utf-8'
                ,(err,data) => {
                    if (err) {
                        console.error(`File read error: ${target}...`);
                        return;
                    }
                    console.log('Apparent success?')
                    // return json.parse(data);
                }));
}

app.use(express.static('public'));

// app.use(readJSON);

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/about', (req, res) => {
    res.render('about.ejs');
})

app.get('/resume', (req, res) => {
    var dataSumm = readJSON('summary');
    var dataHist = readJSON('history');
    var dataQual = readJSON('qualifications')['qualifications'];
    var dataTech = readJSON('tech-skills');
    var dataDomn = readJSON('domain-skills');
    var dataAssn = readJSON('assignments');
    // dataTech['SAS Specialist'].forEach((item) => {
    //     console.log(item);
    // })
    // console.log(dataTech[0]);
    res.render('resume.ejs', {
        dataSumm,
        dataHist,
        dataQual,
        dataTech,
        dataDomn,
        dataAssn
    });
})

app.get('/portfolio', (req, res) => {
    res.render('portfolio.ejs');
})

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})