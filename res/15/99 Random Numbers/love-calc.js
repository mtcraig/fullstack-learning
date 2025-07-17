const { alert, prompt } = require('vscode-websocket-alerts');

nameOne = prompt("First name:");
nameTwo = prompt("Second name:");
rPct = Math.round(Math.random()*100);
    console.log(nameOne + " > " + rPct + "% < " + nameTwo);
if (rPct > 70) {
    console.log("Baes!");
} else if (rPct > 30 && rPct < 70) {
    console.log("Baes?");
} else {
    console.log("Not Baes...");
}