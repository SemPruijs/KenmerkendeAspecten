const ASPECT_URL = "Content/KenmerkendeAspecten.json"
let ASPECTS: [ Chapter] | null = null
let selectedAspect: Aspect | null = null

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

// mode should represent the type of value that the user is typing.   
enum Mode {
    Id,
    Value
}


function answerTextfieldOnEnter(event): void {
    if (event.key === "Enter") {
        const userInput = (document.getElementById("answerTextfield") as HTMLInputElement).value
        clearTextField()                

        if (!showingCorrectness) {            
            showingCorrectness = true
            renderCorrectness(userInput, Mode.Id)
            setAspect()
        } else {
            showingCorrectness = false
            hideCorrectness()
            renderAspect()
        }        
    }
}

function clearTextField(): void {
    let textField = (document.getElementById("answerTextfield") as HTMLInputElement)
    textField.value = ""
}

function isCorrect(aspect:Aspect, input:string, mode: Mode): boolean {        
    const correctAnswer = mode === Mode.Value ? aspect.value : aspect.id
    return correctAnswer === input    
}

function messageAboutCorrectness(correct: boolean, aspect:Aspect, mode): string {
    if (correct) {
        return "Correct! Enter voor  volgende."
    } else {
        // mode should represent the type of value that the user is typing.
        let correctAnswer = mode === "value" ? aspect.value : aspect.id
        return `Fout. Goede antwoord: ${correctAnswer}. Enter voor  volgende.`       
    }
}

// Should be a positive number
// TODO: Change type to Int
function getRandomNumberBelowNumber(number: number): number {
    return Math.floor(Math.random() * number)
}

function randomIndexFromList(list: any): number {
    return getRandomNumberBelowNumber(list.length)
}

// TODO: Call this function on a chapter
function randomIndexFromChapter(aspects, chapter: number): number {
    return randomIndexFromList(aspects.chapters[chapter].aspects)
}

// const aspects = ASPECTS
// TODO: Make this function pure
function randomAspectFromChapter(chapter: number): Aspect {
    const RANDOM_INDEX = randomIndexFromChapter(ASPECTS, chapter)    
    const aspect = getAspect(ASPECTS, chapter, RANDOM_INDEX)
    console.log(aspect)
    return aspect
}


async function getAspects() {
    const RES = await fetch(ASPECT_URL);
    const BODY = await RES.json();

    return BODY;
}

function getAspect(aspects, chapter: number, index: number): Aspect {
    return aspects.chapters[chapter].aspects[index]
}

function setAspect():void {
    selectedAspect = randomAspectFromChapter(1)
}


function renderAspect():void {
    const aspect = selectedAspect
    document.getElementById("question").innerHTML = aspect.value
}

// TODO: Saparate rendering and setting
function renderCorrectness(userInput, mode:Mode):void {
    const aspect = selectedAspect
    const correctness = isCorrect(aspect, userInput, mode)
    const message = messageAboutCorrectness(correctness, aspect, "id")

    document.getElementById("correctness").innerHTML = message
}

function hideCorrectness():void {
    document.getElementById("correctness").innerHTML = ""
}



