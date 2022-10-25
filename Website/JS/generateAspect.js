const ASPECT_URL = "Content/KenmerkendeAspecten.json"
const ASYNC_ASPECTS = getAspects()
var selectedAspect = randomAspectFromChapter(0)
var showingCorrectness = false



function answerTextfieldOnEnter(event) {
    if (event.key === "Enter") {
        let userInput = document.getElementById("answerTextfield").value
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

// TODO: Saparate rendering and setting
async function renderCorrectness(userInput, mode) {
    var aspect = await selectedAspect
    var correctness = isCorrect(aspect, userInput, mode)
    var message = messageAboutCorrectness(correctness, aspect, "id")

    document.getElementById("correctness").innerHTML = message
}

function hideCorrectness() {
    document.getElementById("correctness").innerHTML = ""
}

renderAspect()



