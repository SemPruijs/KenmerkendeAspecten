const ASPECT_URL = "Content/KenmerkendeAspecten.json"
let ASPECTS: [ Chapter] | null = null
let selectedAspect: Aspect = null

getAspects()
    .then((aspects)=> {
        ASPECTS = aspects
        selectedAspect = randomAspectFromChapter(1)
        renderAspect()
    })

let showingCorrectness = false

interface Aspect {
    id: string,
    value: string
}

interface Chapter {
    title: string,
    aspects: [Aspect]
}


function answerTextfieldOnEnter(event) {
    if (event.key === "Enter") {
        const userInput = (document.getElementById("answerTextfield") as HTMLInputElement).value
        clearTextField()                
        // showCorrectness = !showCorrectness
        if (!showingCorrectness) {            
            showingCorrectness = true
            renderCorrectness(userInput, "id")
            setAspect()
        } else {
            showingCorrectness = false
            hideCorrectness()
            renderAspect()
        }
        
    }
}

function clearTextField() {
    let textField = (document.getElementById("answerTextfield") as HTMLInputElement)
    textField.value = ""
}

function isCorrect(aspect:Aspect, input, mode) {    
    // mode should represent the type of value that the user is typing.    var 
    const correctAnswer = mode === "value" ? aspect.value : aspect.id
    return correctAnswer === input    
}

function messageAboutCorrectness(correct, aspect, mode) {
    if (correct) {
        return "Correct! Enter voor  volgende."
    } else {
        // mode should represent the type of value that the user is typing.
        let correctAnswer = mode === "value" ? aspect.value : aspect.id
        return `Fout. Goede antwoord: ${correctAnswer}. Enter voor  volgende.`       
    }
}

// Should be a positive number
function getRandomNumberBelowNumber(number) {
    return Math.floor(Math.random() * number)
}

function randomIndexFromList(list) {
    // return Math.floor(Math.random() * list.length)
    return getRandomNumberBelowNumber(list.length)
}

// TODO: Call this function on a chapter
function randomIndexFromChapter(aspects, chapter) {
    // return randomIndexFromChapter(aspects.chapters[chapter])
    return randomIndexFromList(aspects.chapters[chapter].aspects)
}

function randomAspectFromChapter(chapter): Aspect {
    const aspects = ASPECTS
    const RANDOM_INDEX = randomIndexFromChapter(aspects, chapter)    
    const aspect = getAspect(aspects, chapter, RANDOM_INDEX)
    console.log(aspect)
    return aspect
}


async function 
getAspects() {
    const RES = await fetch(ASPECT_URL);
    const BODY = await RES.json();

    return BODY;
}

function getAspect(aspects, chapter, index) {
    return aspects.chapters[chapter].aspects[index]
}

function setAspect() {
    selectedAspect = randomAspectFromChapter(1)
}


function renderAspect() {
    const aspect = selectedAspect
    document.getElementById("question").innerHTML = aspect.value
}

// TODO: Saparate rendering and setting
function renderCorrectness(userInput, mode) {
    const aspect = selectedAspect
    const correctness = isCorrect(aspect, userInput, mode)
    const message = messageAboutCorrectness(correctness, aspect, "id")

    document.getElementById("correctness").innerHTML = message
}

function hideCorrectness() {
    document.getElementById("correctness").innerHTML = ""
}



