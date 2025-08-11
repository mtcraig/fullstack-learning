function add(n1,n2) {
    return n1 + n2
}

function subtract(n1,n2) {
    return n1 - n2
}

function multiply(n1,n2) {
    return n1 * n2
}

function divide(n1,n2) {
    return n1 / n2
}

function square(n1,n2) {
    return n1 ** n2
}

function calculator(n1,n2,operator) {
    return operator(n1,n2)
}

calculator(1,2,add);
calculator(1,2,subtract);
calculator(1,2,multiply);
calculator(1,2,divide);
calculator(1,2,square);