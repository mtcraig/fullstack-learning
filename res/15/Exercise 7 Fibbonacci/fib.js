function fibonacciGenerator(n) {
    for (var i = 1; i <= n; i ++) {
        if (i === 1) {
            var sequence = [0];
        } else if (i === 2) {
            sequence.push(1);
        } else {
            sequence.push(sequence[i-3] + sequence[i-2]);
        }
    }
    console.log(sequence);
    return sequence;
}

fibonacciGenerator(15);