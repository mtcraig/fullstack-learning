// window.alert("Hello");
// window.alert("World!");

// window.alert(2+3);
// var myName = "Michael";

// alert(myName);

// var message = "Hello";
// var myName = "Michael";
// alert(message + " " + myName + ", your name has " + myName.length + " characters in it.");

// var tweet = prompt("Write a message:");
// alert("You've written " + tweet.length + " characters, you have " + (140 - tweet.length) + " characters remaining.");

// var name = "Michael";
// alert(name.slice(0,1));
// alert(name.slice(name.length - 1,name.length));

// slice is from starting point up to but not including end position
// e.g. x = 0 1 2 3
//          slice(x,1,3)
//  returns   1 2


// var tweet = prompt("Write a message:");
// alert("You've written " + tweet.length + " characters, you have " + (140 - tweet.length) + " characters remaining.");
// alert(tweet.slice(0,140));

// var check = "testing testing testing testing testing testingtesting testing testingtesting testing testingtesting testing testingtesting testing testingt";
// check.length

// var tweet = prompt("Write a message:").slice(0,140);

// var inName = prompt("What is your name?");
// var outName = inName.slice(0,1).toUpperCase() + inName.slice(1,inName.length).toLowerCase();
// alert("Hey " + outName + "! You typed dumb so I fixed it! :)");

var dogAge = prompt("How old is your doggo?");
var humanAge = ((dogAge - 2) * 4) + 21;
alert("Whoa! They're " + humanAge + " in human years!");