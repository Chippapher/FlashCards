class Question{
    constructor(q, a){
            this.question = q;
            this.answer= a;
            this.order = Math.random() * 100;
        }
        reoder() {
            this.order = Math.random() * 100
        }
}

class Button{
    constructor(id, handler){
        this.element = document.getElementById(id)
        this.disabled = false
        this.element.addEventListener("click", handler)
    }
    isDiabled(){
        return this.disabled
    }
    disable(){
        this.disabled = true

        //set style
        let cl = this.element.classList
        if(!cl.contains("disabled")){
            cl.add("disabled")
        }
    }
    enable(){
        this.disabled = false

        //set style
        this.element.classList.remove("disabled")
    }
}