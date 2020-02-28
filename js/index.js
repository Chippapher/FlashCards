

// GLOBAL STATE

const create = new Button("create", () =>{
    const questions = parseRawIn();
    const title = document.getElementById("title").value
    if(title != ""){
    window.localStorage.setItem(title, JSON.stringify(questions))
    document.getElementById("rawInput").value = ""
    document.getElementById("title").value = ""
    } else {
        alert("Please enter a title for your question set.")
    }

    populateSetlist()
})

// END GLOBAL STATE

function parseRawIn(){
    const rawString = document.getElementById("rawInput").value
    const QASet = rawString.split(";")
    const questionArray = []
    QASet.forEach(i => {
        const values = i.split(":")
        questionArray.push(new Question(values[0],values[1]))
    });
    return questionArray
}
function populateSetlist(){
    let storage = window.localStorage
    let setlist = document.getElementById("setlist")
    setlist.innerHTML = ""
    for(let i = 0; i< storage.length; i++){
        const key = storage.key(i)

        let listitem = document.createElement("li")

        let fcLink = document.createElement("a")
        fcLink.href = `./html/flashCards.html#${key}`
        fcLink.innerHTML = key

        let delLink = document.createElement("a")
        delLink.href= "#"
        delLink.id= `delete${key}`
        delLink.classList = "delete"
        delLink.innerHTML= "delete"

        let editLink = document.createElement("a")
        editLink.href= `./html/setEditor.html#${key}`
        editLink.classList= "delete"
        editLink.id = `edit{key}`
        editLink.innerHTML = "edit"


        listitem.appendChild(editLink)
        listitem.appendChild(fcLink)
        listitem.appendChild(delLink)
        setlist.appendChild(listitem)
        let elem = document.getElementById("delete"+key)
        console.log(elem)
        elem.addEventListener("click", e => {
            e.preventDefault()
            // let key = e.target.id.substring(6)
            console.log(key)
            let yes = window.confirm(`delete ${key}?`)
            if(yes){
                storage.removeItem(key);
            }
            populateSetlist()
        })
            
    }

}


populateSetlist();





