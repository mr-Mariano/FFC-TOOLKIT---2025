const Stack = require('./stack.js');

function verifyParentheses(expression){
    //Verificar que los parentesis sean correctos, desde antes de correrlo
    const myStack = new Stack();
    for(const char of expression){    
        if (char === '('){
            myStack.penStack(char);
        }else if(char == ')'){
            if(myStack.isEmpty()){
                return false
            }
            myStack.deStack();
        }
    }
    return myStack.isEmpty();
}

function verifyNotation(expression){
    //declaramos los operadores que son validos
    operators = ['^','v','¬','→','↔',')','(']; 
    //Deberiamos tener variables y operadores iguales a la logitud entera de la expression
    let cont = 0
    for(const char of expression){
        if(/[a-zA-Z]/.test(char) || operators.includes(char)){
            cont++;
        }
    }
    return expression.length == cont;
}

function verifyexpression(expression){
    return verifyParentheses(expression) && verifyNotation(expression);
}

module.exports = {verifyexpression}