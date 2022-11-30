function clearTextField(): void {
    let textField = (document.getElementById("answerTextfield") as HTMLInputElement)
    textField.value = ""
}

function hideCorrectness():void {
    document.getElementById("correctness").innerHTML = ""
}

function showCorrectness(userInput: string, mode:LearnMode, aspect: Aspect):void {
    const correctness = isCorrect(aspect, userInput, mode)
    const message = messageAboutCorrectness(correctness, aspect, LearnMode.Id)

    document.getElementById("correctness").innerHTML = message
}

function renderNewAspect(aspect:Aspect):void {
    document.getElementById("question").innerHTML = aspect.value
}    

function renderUIMode(mode: UIMode): void {
    const learningClass = mode == UIMode.ChapterSelect ? "hidden" : ""
    const chapterSelectClass = mode == UIMode.ChapterSelect ? "" : "hidden"

    document.getElementById("chapter-select-container").className = chapterSelectClass
    document.getElementById("learning-container").className = learningClass    
}

function showingChapterSelectError(visable: boolean): void {    
    document.getElementById("error").innerHTML = visable ? "Selecteer minstens 1 hoofdstuk" : ""
}

function showAbleToLearnState(ableToLearn: boolean): void {
    document.getElementById("start-learning").className = ableToLearn ? "highlighted-button" : ""
}


function renderChapterselect(chapters: Array<Chapter>) {
    const container = document.getElementById("checkbox-container")
    const ul = document.createElement("ul")

    for (let i = 0; i < chapters.length; i++) {
        const li = document.createElement("li")
        // create checkbox
        const checkbox = document.createElement("input")
        checkbox.id = i.toString()
        checkbox.className = "chapter-checkbox"
        checkbox.type = "checkbox"
        checkbox.setAttribute("onclick", "setChapter(this)")

        // create label for checkbox
        const label = document.createElement("label")
        label.setAttribute("for", i.toString())
        label.innerHTML = chapters[i].title


        li.appendChild(checkbox)
        li.appendChild(label)

        ul.appendChild(li)
    }    

    container.appendChild(ul)
}
