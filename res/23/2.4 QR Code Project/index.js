/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

inquirer
    .prompt([
        {
            message: "Enter a website:",
            name: "url"
        }
    ])
    .then((answers) => {
        fs.writeFile('website-url.txt',answers.url, (err) => {
            if (err) throw err;
            console.log(`Written out the requested URL ${answers.url}`);
        });
        var qrSVG = qr.image(answers.url, {type:'svg'});
        qrSVG.pipe(fs.createWriteStream('./website-qr.svg'));
        console.log(`Created QR code for the requested URL ${answers.url}`);
    })
    .catch((error) => {
        if (error.isTtyError) {

        } else {

        }
    });