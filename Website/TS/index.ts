const ASPECT_URL = "Content/KenmerkendeAspecten.json"
const SELECTED_CHAPTERS: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8,, 9]
let selectedAspect: Aspect | null = null
let CHAPTERS: Array<Chapter> | null = null
let showingCorrectness = false
let order: Array<Aspect> | null = null


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

function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};


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

function indexToChapter(index: number, chapters: Array<Chapter>): Chapter {
    return chapters[index]
}

function indexesToChapters(indexs: Array<number>, chapters: Array<Chapter>): Array<Chapter> {
    const indexToChapterr = (index: number) => indexToChapter(index, chapters);
    return indexs.map(indexToChapterr)
}

function listAspectsFromChapters(chapters: Array<Chapter>): Array<Aspect> {
    return chapters.flatMap(chapter => chapter.aspects)
}

function generateNewOrder(oldOrder: Array<Aspect>): Array<Aspect> {
    const lastAspect = oldOrder[oldOrder.length - 1]
    const newOrder: Array<Aspect> = shuffle(oldOrder.filter((aspect) => aspect.id != lastAspect.id)).concat([lastAspect])
    return newOrder
}

function randomAspectFromChapters(chapters: Array<number>): Aspect {
    const randomIndex = chapters[Math.floor(Math.random() * chapters.length)]
    const randomChapter = CHAPTERS[randomIndex]

    return randomAspectFromChapter(randomChapter)

}


function isCorrect(aspect:Aspect, input:string, mode: Mode): boolean {        
    const correctAnswer = mode == Mode.Value ? aspect.value : aspect.id
    return correctAnswer == input    
}

function messageAboutCorrectness(correct: boolean, aspect:Aspect, mode:Mode): string {
    if (correct) {
        return "Correct! Enter voor  volgende."
    } else {
        let correctAnswer = mode == Mode.Value ? aspect.value : aspect.id
        return `Fout. Goede antwoord: ${correctAnswer}. Enter voor  volgende.`       
    }
}

// --- STATE ---

function setAspect():void {
    selectedAspect = randomAspectFromChapters(SELECTED_CHAPTERS)
}


// --- DOM ---

function clearTextField(): void {
    let textField = (document.getElementById("answerTextfield") as HTMLInputElement)
    textField.value = ""
}

function hideCorrectness():void {
    document.getElementById("correctness").innerHTML = ""
}

function showCorrectness(userInput: string, mode:Mode):void {
    const aspect = selectedAspect
    const correctness = isCorrect(aspect, userInput, mode)
    const message = messageAboutCorrectness(correctness, aspect, Mode.Id)

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
        selectedAspect = randomAspectFromChapters(SELECTED_CHAPTERS)
        // console.log(selectedAspect)        
        // console.log(indexToChapter(0, CHAPTERS))
        // console.log(indexesToChapters([0, 1], CHAPTERS))
        // console.log(listAspectsFromChapters(indexesToChapters([0,1], chapters)))
        // console.log(generateNewOrder(listAspectsFromChapters(indexesToChapters([0,1], chapters))))
        order = listAspectsFromChapters(indexesToChapters([0], chapters))
        renderNewAspect()
    })

    // Runs when the user presses enter
function answerTextfieldOnEnter(event: KeyboardEvent): void {
    if (event.key == "Enter") {        
        order = generateNewOrder(order)
        console.log(order)
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

// console.log(indexesToChapters([0,1], CHAPTERS))
