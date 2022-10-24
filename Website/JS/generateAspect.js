const ASPECT_URL = "Content/KenmerkendeAspecten.json"
const ASYNC_ASPECTS = getAspects()
var selectedAspect = randomAspectFromChapter(0)
var showCorrectness = false



function answerTextfieldOnEnter(event) {
    var userInput = document.getElementById("answerTextfield").value
    if (event.key === "Enter") {
        console.log(isCorrect(selectedAspect, userInput, "id"))
        console.log(messageAboutCorrectness(isCorrect(selectedAspect, userInput, "id"), selectedAspect, "id"))
        showCorrectness = !showCorrectness
        if (showCorrectness) {            
            renderCorrectness()
        } else {
            clearCorrectness()
            setAspect()
            renderAspect()
        }
        clearTextField()                
        
    }
}

function clearTextField() {
    var textField = document.getElementById("answerTextfield")
    textField.value = ""
}

function isCorrect(aspect, input, mode) {    
    // mode should represent the type of value that the user is typing.    var 
    var correctAnswer = mode === "value" ? aspect.value : aspect.id
    return correctAnswer === input    
}

function messageAboutCorrectness(correct, aspect, mode) {
    if (correct) {
        return "Correct! Enter voor  volgende."
    } else {
        // mode should represent the type of value that the user is typing.
        var correctAnswer = mode === "value" ? aspect.value : aspect.id
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

async function randomAspectFromChapter(chapter) {
    var aspects = await ASYNC_ASPECTS
    const RANDOM_INDEX = randomIndexFromChapter(aspects, chapter)    
    var aspect = getAspect(aspects, chapter, RANDOM_INDEX)
    console.log(aspect)
    return aspect
}


async function getAspects() {
    const RES = await fetch(ASPECT_URL);
    const BODY = await RES.json();

    return BODY;
}

function getAspect(aspects, chapter, index) {
    return aspects.chapters[chapter].aspects[index]
}

async function setAspect() {
    selectedAspect = await randomAspectFromChapter(0)
}


async function renderAspect() {
    // var aspect = await randomAspectFromChapter(0)
    var aspect = await selectedAspect
    document.getElementById("question").innerHTML = aspect.value
}

async function renderCorrectness(correct, mode) {
    var userInput = document.getElementById("answerTextfield").value

    var aspect = await selectedAspect
    var correctness = isCorrect(aspect, userInput, "id")
    var message = messageAboutCorrectness(correctness, aspect, "id")

    document.getElementById("correctness").innerHTML = message
}

function clearCorrectness() {
    document.getElementById("correctness").innerHTML = ""
}

renderAspect()



