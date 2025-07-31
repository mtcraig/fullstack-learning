import express from 'express';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

const app = express();
const port = 3000;
const viewsDir = path.resolve() + '/views/';
const publicDir = path.resolve() + '/public/';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

function readJSON(target) {
    return JSON.parse(fs.readFileSync(`public/content/${target}.json`
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
    var dataNav = readJSON('nav/navigation');
    var activeNav = '';
    res.render('index.ejs', {
        viewsDir,
        publicDir,
        dataNav,
        activeNav
    });
})

app.get('/about', (req, res) => {
    var dataNav = readJSON('nav/navigation');
    var activeNav = 'about';
    res.render('about.ejs', {
        viewsDir,
        publicDir,
        dataNav,
        activeNav
    });
})

app.get('/resume', (req, res) => {
    var dataNav = readJSON('nav/navigation');
    var activeNav = 'resume';
    var dataSumm = readJSON('resume/summary');
    var dataHist = readJSON('resume/history');
    var dataQual = readJSON('resume/qualifications')['qualifications'];
    var dataTech = readJSON('resume/tech-skills');
    var dataDomn = readJSON('resume/domain-skills')['Domain Skills'];
    var dataAssn = readJSON('resume/assignments')['Assignments'];
    // dataTech['SAS Specialist'].forEach((item) => {
    //     console.log(item);
    // })
    // console.log(dataTech[0]);
    res.render('resume.ejs', {
        viewsDir,
        publicDir,
        dataNav,
        activeNav,
        dataSumm,
        dataHist,
        dataQual,
        dataTech,
        dataDomn,
        dataAssn
    });
})

app.get('/portfolio', (req, res) => {
    var dataNav = readJSON('nav/navigation');
    var activeNav = 'portfolio';
    res.render('portfolio.ejs', {
        viewsDir,
        publicDir,
        dataNav,
        activeNav
    });
})

app.get('/portfolio/ppp-sweepstakes', (req, res) => {
    var dataNav = readJSON('nav/navigation');
    var activeNav = 'portfolio/ppp-sweepstakes';
    res.render('portfolio/ppp-sweepstakes.ejs', {
        viewsDir,
        publicDir,
        dataNav,
        activeNav
    });
})

app.get('/contact', (req, res) => {
    var dataNav = readJSON('nav/navigation');
    var activeNav = 'contact';
    res.render('contact.ejs', {
        viewsDir,
        publicDir,
        dataNav,
        activeNav
    });
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})