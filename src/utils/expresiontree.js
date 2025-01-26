class node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }

    addToTheLeft(value){
        // if(!(value instanceof node)){ 
        //     this.left.add(value);
        // }else{
            this.left = new node(value);
        // }
    }

    addToTheRight(value){
        // if(!(value instanceof node)){ 
        //     this.right.add(value);
        // }else{
            this.right = new node(value);
        // }
    }
}


class expressionTree{
    constructor(){
        this.steps = []
    }

    preOrder(x){
        if (!x) return;
        if (x.value !== null) { 
            console.log(x.value);
        }
        this.preOrder(x.left);
        this.preOrder(x.right);
    }

    inOrder(x){
        if (!x) return;
        this.inOrder(x.right);
        if (x.value !== null) { 
            console.log(x.value);
        }
        this.inOrder(x.left);
    }

    postOrder(x){
        if (!x) return;
        this.postOrder(x.right);
        this.postOrder(x.left);
        if (x.value !== null) { 
            console.log(x.value);
        }
    }  

    evalTree(node){
        function charToBoolean(char) {
            return char === '1';
        }
        function BooleanToChar(boolean) {
            return boolean ? '1' : '0';
        }

        //evaluamos en este orden
        //izquierda -> derecha -> raiz
        //por ende: POSTorden
        
        if (!node) return 0;

        if(/[0-1]/.test(node.value))
            return node.value
        
        const leftValue = this.evalTree(node.left);
        const rightValue = this.evalTree(node.right);
        
        switch (node.value) {
            case '^':
                this.steps.push((leftValue) +'^'+(rightValue)+"=" + (leftValue && rightValue))
                return  BooleanToChar(charToBoolean(leftValue) && charToBoolean(rightValue));
            case 'v':
                this.steps.push((leftValue) +'v'+(rightValue)+"=" + (leftValue || rightValue))
                return BooleanToChar(charToBoolean(leftValue) || charToBoolean(rightValue));
            case '¬':
                this.steps.push('¬'+(rightValue)+"="+ (BooleanToChar(!rightValue)))
                return BooleanToChar(!charToBoolean(rightValue));
            default:
                throw new Error(`unkwown operator: ${node.value}`);
        }
    }
}




module.exports = {node, expressionTree};