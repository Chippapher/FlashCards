/**
 * 
 * should make a differnt mechanism for pcs and phones
 * 
 */



//lession learned: class declareations are hoisted; beware.




//GLOBAL STATE

QUESTION_ARRAY = JSON.parse(window.localStorage.getItem(String(decodeURIComponent(window.location)).split("#")[1]))  /*fmtQuestions()*/

QUESTION_INDEX = 0

NEXT = new Button("next", nextQuestion)

PREV = new Button("prev", prev)

//END GLOBAL STATE







function fmtQuestions(){
    var questions = [];
    let q = new Question("What is the anti-derivative of: x^n dx", "x^(n + 1)/(n+1)")
    questions.push(q)
    questions.push(new Question("What is the anti-derivative of: (1/kx + b) dx", "ln(|kx + b|)/k"))
    questions.push(new Question("What is the anti-derivative of: Sin(kx) dx", "-Cos(kx)/k"))
    questions.push(new Question("What is the anti-derivative of: e^(kx) dx", "e^(kx)/k"))
    questions.push(new Question("What is the anti-derivative of: Cos(kx) dx", "Sin(kx)/k"))
    questions.push(new Question("What is the anti-derivative of: Sec^2(x) dx", "Tan(x)"))
    questions.push(new Question("What is the anti-derivative of: Sec(x)Tan(x) dx", "Sec(X)"))
    questions.push(new Question("What is the anti-derivative of: Tan(x) dx", "ln|Sec(x)|"))
    questions.push(new Question("What is the anti-derivative of: 1/(x^2 + k^2) dx", "arcTan(x/k)/k"))
    questions.push(new Question("What is the anti-derivative of: 1/sqrt(k^2 - x^2) dx", "arcSin(x/k)"))
    questions.push(new Question("What is the anti-derivative of: 1/(x^2 + k^2) dx", "arcTan(x/k)/k"))
    questions.push(new Question("What is the anti-derivative of: k^x dx", "k^x / ln(k)"))
    questions.push(new Question("What is the anti-derivative of: Sec(x) dx", "ln|Sec(x)Tan(x)|"))

    questions.sort((a,b) => a.order-b.order)

    window.localStorage.setItem("Anti-Derivatives", JSON.stringify(questions))
    return questions
}


function reorderQuestions(qs){
    qs.forEach(q=> q.reoder())
    return qs.sort((a,b) => a.order - b.order)
}

function nextQuestion(){
    if(QUESTION_INDEX + 1 >= QUESTION_ARRAY.length){
        //wrap around
        QUESTION_ARRAY = reorderQuestions(QUESTION_ARRAY)
        QUESTION_INDEX = 0
    } else {
        QUESTION_INDEX++
    }
    displayQuestion()
}

function prev(){
    if(QUESTION_INDEX > 0){
        QUESTION_INDEX--
    }
    displayQuestion()
}

function displayQuestion(){
    let q = QUESTION_ARRAY[QUESTION_INDEX]
    console.log(q)
    document.getElementById("question").innerHTML = q.question
    document.getElementById("answer").innerHTML = q.answer
    if(QUESTION_INDEX == 0){
        PREV.disable()
    } else {
        PREV.enable()
    }
    document.getElementById("completion").innerHTML = QUESTION_INDEX+1 + "/" + QUESTION_ARRAY.length
}
displayQuestion();

(function(){
    document.title = String(document.location).split("#")[1] + " Flash Cards"
})();