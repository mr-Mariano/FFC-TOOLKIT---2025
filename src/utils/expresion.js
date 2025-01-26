const { verifyexpression } = require('./validations.js');
const Stack = require('./stack.js');
const { node, expressionTree} = require('./expresiontree.js');


function varsCounter(expression){
    //Si es necesario hasta con palabras, es necesario tener de delimitador no caracteres, si no simbolos
    //presuponemos que todo lo que no es un simbolo es una variable
    //por cada simbolo hay 2 variables SI ESTA BIEN ESCRITO
    let seenVars = new Set()
    for(let i=0; i<expression.length; i++){
        if((/[a-zA-Z]/.test(expression[i]) && !seenVars.has(expression[i]) && expression[i] != 'v') ){
            seenVars.add(expression[i])
        }
    }
    return seenVars;
}

function cleanExpression(expression) {
    return expression.replace(/(?<![!¬])\(([a-zA-Z0-9])\)/g, '$1');
}

function ValuesToTest(nums) {
    const totalcombinations = 1<<nums
    let combinations = []
    for (let i = 0; i < totalcombinations; i++) {
        const combination = []
        for(let j=0; j < nums; j++){
           combination.push(Boolean(i & ( 1 << j)))
        }
        combinations.push(combination);
    }
    return combinations.slice(0, Math.pow(2,totalcombinations))
}

function iterateAnswers(values, expVars, expression){
    answers = [];
    arrayExpVars = [...expVars]; //Al estar en un set, no se puede indexar, lo pasamos a un array
    for(const iteration of values){
        let currentExpression = expression;
        for(let i=0; i< expVars.size; i++){
            const variable = arrayExpVars[i];
            //reemplazamos depende del estado booleano, en vez de escribir TRUE, o FALSE, usamos 1 o 0
            //le facilitamos el trabajo al arbol leyendo caracter por caracter
            const value = iteration[i] ? 1 : 0;
            //reemplazamos las letras por sus valores por iteracion
            //new RegExp(variable, 'g')     busca por ejemplo, todas las variables 'p' por el valor de 1 o 0
            // la 'g' es una bandera, buscara a manera global
            currentExpression = currentExpression.replace(new RegExp(variable, 'g'), value);
        }
        answers.push(currentExpression);
    }
    console.log(answers)
    return answers
}

function isOperator(c) {
    return ['^','v','¬','→','↔','(', ')',].includes(c);
}

function samePriority(c1, c2){
    // 1 -> mayor prioridad
    // 0 -> misma prioridad
    //-1 -> menor prioridad
    const priority = {
        '(': 0, //menor prioridad
        ')': 0,
        'v': 1, 
        '^': 2,
        '¬': 10, //mayor prioridad
    };
    const p1 = priority[c1]; //anterior
    const p2 = priority[c2]; //actual
    if (p1 === p2) {
        return 0; 
    } else if (p1 < p2) {
        return 1; 
    } else { 
        return -1; 
    }
}

function makeTreeNode(root, left, right){

    if(root =='(' || root == ')'){
        return right
    }

    const tree = new node(root);
    if (left instanceof node && left !== null) {
        tree.left = left;
    }else if(!(left instanceof node) && left !== null ){
        tree.addToTheLeft(left);
    }
    if (right instanceof node && right !== null) {
        tree.right = right;
    }else if( (!(right instanceof node) && right != null) ){
        tree.addToTheRight(right);
    }

    return tree;
}

function makeNegateNode(right, operatorStack){
    //si el siguiente operador no es negacion o si esta vacia, ya salimos
    //igualmente, si entraste a esta funcion, significa que al menos una vez se niega
    let operator = operatorStack.deStack();
    let d1 = right;
    negatedNode = makeTreeNode(operator, null, d1);
    if (operatorStack.printTop != '¬' || operatorStack.isEmpty()){
        return negatedNode;
    }
    return makeNegateNode(negatedNode, operatorStack);
}

function UpdateValuesStack(valuesStack, operatorStack){
    let d1 = valuesStack.deStack();
    let d2 = valuesStack.deStack() ?? null;
    
    let operator = operatorStack.deStack();
    let treeNode = makeTreeNode(operator, d2, d1);
    valuesStack.penStack(treeNode);
}

function makeTree(expression){
    const operatorStack = new Stack();
    const valuesStack = new Stack();

    for(const char of expression){
        if(isOperator(char)){
            if(char == '(' || char == '¬'){
                operatorStack.penStack(char);
                continue
            } 
            if((!operatorStack.isEmpty() 
                && samePriority(operatorStack.printTop, char) == 0)
                || char == ')'
            ){
                UpdateValuesStack(valuesStack, operatorStack);
                if(operatorStack.printTop == '(' && char == ')'){
                    operatorStack.deStack();
                    continue
                } 
            }
            //si el nuevo operador tiene prioridad menor, hacemos un arbol con los valores de los ultimos
            // valores prioritarios digamos (matematicas normales): 3^2+1
            //guardamos el 3 y el 2, al igual que el ^ en otra pila, al leer el + hacemos un arbol con
            // 2 ^ 3 para luego unirlo al del + 1
            else if(!operatorStack.isEmpty() && samePriority(operatorStack.printTop, char) == -1 
                    && operatorStack.printTop != '('){
                UpdateValuesStack(valuesStack, operatorStack);
                if(!operatorStack.isEmpty()){
                    UpdateValuesStack(valuesStack, operatorStack);
                }
            }
            operatorStack.penStack(char);
        }else{
            if(operatorStack.printTop == '¬'){
                let node = makeNegateNode(char, operatorStack)
                valuesStack.penStack(node);
            }else{
                valuesStack.penStack(char);
            }
        }
    }

    while (!operatorStack.isEmpty()) {
        if(operatorStack.printTop == '¬'){
            let node = makeNegateNode(valuesStack.deStack(), operatorStack);
            valuesStack.penStack(node);
            continue
        }
        UpdateValuesStack(valuesStack, operatorStack);
    }
    //Debe al final de solo quedar un elemento, que es el arbol entero
    return valuesStack.printStack[0]
}

function evaluateIterations(answersToEvaluate){
    resp = []
    for(const Iteration of answersToEvaluate){
        tree = makeTree(Iteration);
        const ValuesTree = new expressionTree();
        let answ = ValuesTree.evalTree(tree);
        resp.push([Iteration, ...ValuesTree.steps, answ,])
    }
    return resp;
}



function main(expression){

    const expEval = cleanExpression(expression);
    try {
        if(!verifyexpression(expEval))
            throw SyntaxError
        
        let seenVars = varsCounter(expEval);
        let ttable = ValuesToTest(seenVars.size);
        let answersToEvaluate = iterateAnswers(ttable, seenVars, expEval);
        let allanswers = evaluateIterations(answersToEvaluate);
        // console.table(allanswers)
        return allanswers
    } catch (error) {
        console.log("ERROR: "+ error)
    }
}

