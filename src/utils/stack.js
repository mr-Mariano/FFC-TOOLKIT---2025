 class Stack {
    constructor() {
        this.items = {}
        this.frontIndex = 0;
        this.backIndex = 0;
    }

    penStack(item){
        this.items[this.backIndex] = item;
        this.backIndex++;
        // return item + ' interted'
    }

    deStack(){
        if (this.backIndex === 0) {
            return undefined;
        }
        this.backIndex--;
        const item = this.items[this.backIndex]
        delete this.items[this.backIndex]
        return item 
    }

    isEmpty(){
        return this.backIndex === 0;
    }

    get printStack(){
        return this.items
    }

    get printTop(){
        return this.items[this.backIndex-1]
    }
}

module.exports = Stack;