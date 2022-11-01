const ASPECT_URL = "Content/KenmerkendeAspecten.json"
const selectedChapters: Array<number> = [0, 1, 2]
let selectedAspect: Aspect | null = null
let CHAPTERS: Array<Chapter> | null = null
let showingCorrectness = false


// TODO: Put the types in a seperate typescript file
// --- TYPES ---

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

// --- GET INFORMATION ---

// Load chapters
async function getChapters(): Promise<[Chapter]> {
    const res = await fetch(ASPECT_URL);
    const body = await res.json();

    return body.chapters;
}

function randomAspectFromChapter(chapter: Chapter): Aspect {
    return chapter.aspects[Math.floor(Math.random() * chapter.aspects.length)]
}

function randomAspectFromChapters(chapters: Array<number>): Aspect {
    const randomIndex = chapters[Math.floor(Math.random() * chapters.length)]
    const randomChapter = CHAPTERS[randomIndex]

    return randomAspectFromChapter(randomChapter)

}

function getAspect(aspects, chapter: number, index: number): Aspect {
    return aspects.chapters[chapter].aspects[index]
}

function isCorrect(aspect:Aspect, input:string, mode: Mode): boolean {        
    const correctAnswer = mode === Mode.Value ? aspect.value : aspect.id
    return correctAnswer === input    
}

function messageAboutCorrectness(correct: boolean, aspect:Aspect, mode): string {
    if (correct) {
        return "Correct! Enter voor  volgende."
    } else {
        let correctAnswer = mode === "value" ? aspect.value : aspect.id
        return `Fout. Goede antwoord: ${correctAnswer}. Enter voor  volgende.`       
    }
}

// --- STATE ---

function setAspect():void {
    // selectedAspect = randomAspectFromChapter(CHAPTERS[0])
    selectedAspect = randomAspectFromChapters(selectedChapters)
}


// --- DOM ---

function clearTextField(): void {
    let textField = (document.getElementById("answerTextfield") as HTMLInputElement)
    textField.value = ""
}

function hideCorrectness():void {
    document.getElementById("correctness").innerHTML = ""
}

function showCorrectness(userInput, mode:Mode):void {
    const aspect = selectedAspect
    const correctness = isCorrect(aspect, userInput, mode)
    const message = messageAboutCorrectness(correctness, aspect, "id")

    document.getElementById("correctness").innerHTML = message
}

function renderNewAspect():void {
    const aspect = selectedAspect
    document.getElementById("question").innerHTML = aspect.value
}    

// --- Runtime ---

getChapters() 
    .then((chapters: [Chapter]) => {
        CHAPTERS = chapters
        selectedAspect = randomAspectFromChapters(selectedChapters)
        console.log(selectedAspect)        
        renderNewAspect()
    })

    // Runs when the user presses enter
function answerTextfieldOnEnter(event): void {
    if (event.key === "Enter") {
        const userInput = (document.getElementById("answerTextfield") as HTMLInputElement).value
        clearTextField()                

        if (!showingCorrectness) {            
            showingCorrectness = true
            showCorrectness(userInput, Mode.Id)
            setAspect()
        } else {
            showingCorrectness = false
            hideCorrectness()
            renderNewAspect()
        }        
    }
}
