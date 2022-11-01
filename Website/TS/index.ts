const ASPECT_URL = "Content/KenmerkendeAspecten.json"
let selectedAspect: Aspect | null = null
let CHAPTERS: Array<Chapter> | null = null

getChapters() 
    .then((chapters: [Chapter]) => {
        CHAPTERS = chapters
        selectedAspect = RandomAspectFromChapter0(chapters[0])
        console.log(selectedAspect)        
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

function RandomAspectFromChapter0(chapter: Chapter): Aspect {
    return chapter.aspects[Math.floor(Math.random() * chapter.aspects.length)]
}

async function getChapters(): Promise<[Chapter]> {
    const res = await fetch(ASPECT_URL);
    const body = await res.json();

    return body.chapters;
}

function getAspect(aspects, chapter: number, index: number): Aspect {
    return aspects.chapters[chapter].aspects[index]
}

function setAspect():void {
    selectedAspect = RandomAspectFromChapter0(CHAPTERS[0])
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



