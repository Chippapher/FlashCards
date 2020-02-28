//GLOBAL STATE

let SET_TITLE = String(decodeURIComponent(window.location)).split("#")[1]


let QUESTION_SET = JSON.parse(window.localStorage.getItem(SET_TITLE))
let QUESTION_INDEX = 0

QUESTION_INDEX.__proto__.updateCounter = ()=>{
    document.getElementById("counter").innerHTML = `${QUESTION_INDEX + 1}/${QUESTION_SET.length}`
}

QUESTION_INDEX.__proto__.increment = () =>{
    QUESTION_INDEX++
    QUESTION_INDEX %= QUESTION_SET.length 
    QUESTION_INDEX.updateCounter()
}
QUESTION_INDEX.__proto__.decrement = () =>{
    if(QUESTION_SET.length == 0){
        QUESTION_INDEX = 0
    }else if(QUESTION_INDEX == 0){
        QUESTION_INDEX = QUESTION_SET.length - 1.
    } else {
        QUESTION_INDEX--
    }
    QUESTION_INDEX.updateCounter()
}


//END GLOBAL STATE



function setQuestionText(){
    document.getElementById("question").value = QUESTION_SET[QUESTION_INDEX].question
}


function setAnswerText(){
    document.getElementById("answer").value = QUESTION_SET[QUESTION_INDEX].answer
}

function getQuestionText(){
    return document.getElementById("question").value
}


function getAnswerText(){
    return document.getElementById("answer").value
}

function saveCurrentQuestion(){
    let q = getQuestionText()
    let a = getAnswerText()
    QUESTION_SET[QUESTION_INDEX].question =q
    QUESTION_SET[QUESTION_INDEX].answer = a
}
//init
(function(){
    QUESTION_INDEX.updateCounter()


    document.getElementById("titleEditor").value = SET_TITLE
    setQuestionText()
    setAnswerText()
    let save = new Button("save", ()=>{
        saveCurrentQuestion()
        if(SET_TITLE !== document.getElementById("titleEditor").value){
            window.localStorage.removeItem(SET_TITLE);
            SET_TITLE = document.getElementById("titleEditor").value
        }
            window.localStorage.setItem(SET_TITLE, JSON.stringify(QUESTION_SET))
    })
    let del = new Button("del", ()=>{
        let q = QUESTION_SET.splice(QUESTION_INDEX , 1)
        console.log(q)
        console.log(QUESTION_SET[QUESTION_INDEX])
        if(QUESTION_INDEX >= QUESTION_SET.length){
            QUESTION_INDEX = 0
        }
        setQuestionText()
        setAnswerText()
        QUESTION_INDEX.updateCounter()
    })
    let add = new Button("add", ()=>{
        saveCurrentQuestion()
        let rest = QUESTION_SET.splice(QUESTION_INDEX+ 1, QUESTION_SET.length - QUESTION_INDEX - 1)
        QUESTION_SET.push(new Question("",""))
        QUESTION_SET.push(...rest)
        QUESTION_INDEX.increment()

        setAnswerText()
        setQuestionText()
    })

    /**
     * move is a higher order funtion that moves from one question to the next
     * using the index function to determine the direction of motion
     */
    let move = function(indexFunc){
        saveCurrentQuestion()
        indexFunc()
        setQuestionText()
        setAnswerText()
    }
    let next = new Button("next", ()=>{
        move(QUESTION_INDEX.increment)
    })
    let prev = new Button("prev", ()=>{
        move(QUESTION_INDEX.decrement)
    }
    )
    
})();

