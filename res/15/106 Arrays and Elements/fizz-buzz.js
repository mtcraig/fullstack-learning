var reference = [];
var output = [];

function fizzBuzz() {
    var nextNum = output.length + 1;
    if ((nextNum % 3 === 0) && (nextNum % 5 === 0)) {
        var nextOut = "FizzBuzz";
    } else if (nextNum % 3 === 0) {
        var nextOut = "Fizz"
    } else if (nextNum % 5 === 0) {
        var nextOut = "Buzz"
    } else {
        var nextOut = nextNum;
    }
    reference.push(nextNum);
    output.push(nextOut);
    console.log(output);
}

fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();
fizzBuzz();