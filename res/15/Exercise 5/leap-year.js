const { alert, prompt } = require('vscode-websocket-alerts');

function isLeap(year) {
    var mod4 = year % 4;
    var mod100 = year % 100;
    var mod400 = year % 400;

    if (mod400 === 0 || (mod4 === 0 && mod100 !== 0)) {
        console.log("Leap year");
    } else {
        console.log("Not a leap year");
    }
}

var yearRequest = prompt("What year?");
isLeap(yearRequest);