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
enum LearnMode {
    Id,
    Value
}

enum UIMode {
    Learning,
    ChapterSelect
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


// --- Constants and varibels ---

const ASPECT_URL = "content/kenmerkendeAspecten.json"
let SELECTED_CHAPTERS: Array<number> = []
let CHAPTERS: Array<Chapter> | null = null
let showingCorrectness = false
let order: Array<Aspect> | null = null
let currentIndex = 0
let uimode: UIMode = UIMode.ChapterSelect


// --- GET INFORMATION ---

// Load chapters
async function getChapters(): Promise<[Chapter]> {
    const res = await fetch(ASPECT_URL);
    const body = await res.json();

    return body.chapters;
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

// function generateNewOrder(oldOrder: Array<Aspect>): Array<Aspect> {
//     const lastAspect = oldOrder[oldOrder.length - 1]
//     const newOrder: Array<Aspect> = shuffle(oldOrder.filter((aspect) => aspect.id != lastAspect.id)).concat([lastAspect])
//     return newOrder
// }

// The last 20% of the aspects will appear in the last 80% of the new older.
function generateNewOrder(oldOrder: Array<Aspect>): Array<Aspect> {
    // make 2 arrays, the firstSplit is the first 80%, last split the remaining 20%
    const firstSplit = oldOrder.slice(0, Math.floor(oldOrder.length * 0.8))
    const lastSplit = oldOrder.slice(Math.floor(oldOrder.length * 0.8), oldOrder.length)

    // shuffle the first 80%
    const shuffledFirstSplit = shuffle(firstSplit)

    // remove the first 20% of the shuffled 80%. These percentages are based on the whole list length.
    const noStartShuffleFirstSplit = shuffledFirstSplit.slice(lastSplit.length, shuffledFirstSplit.length)

    // make list based on the list above and append the aspects from the last 20% of the list (The second list in this function)
    let NSSFSWithLastPart = noStartShuffleFirstSplit 

    for (let i = 0; i < lastSplit.length; i++) {
        const randomIndex = Math.floor(NSSFSWithLastPart.length * Math.random())
        NSSFSWithLastPart.splice(randomIndex, 0, lastSplit[i])
    }

    // get the starting aspects of the shuffled first 80# that where not include in the new last 80%
    const start = shuffledFirstSplit.slice(0, lastSplit.length)

    // create the newOlder list, with the new 20% and the new 80$
    const newOrder = start.concat(NSSFSWithLastPart)

    return newOrder
}

function isCorrect(aspect:Aspect, input:string, mode: LearnMode): boolean {        
    const correctAnswer = mode == LearnMode.Value ? aspect.value : aspect.id
    return correctAnswer == input    
}

function messageAboutCorrectness(correct: boolean, aspect:Aspect, mode:LearnMode): string {
    if (correct) {
        return "Correct! Enter voor  volgende."
    } else {
        let correctAnswer = mode == LearnMode.Value ? aspect.value : aspect.id
        return `Fout. Goede antwoord: <b>${correctAnswer}</b>. Enter voor  volgende.`       
    }
}

// --- DOM ---

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
    // document.getElementById("error").innerHTML = "Selecteer minstens 1 hoofdstuk"
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

// --- State ---

function setAspect():void {
    if (currentIndex < order.length - 1) {
        currentIndex++
    } else {
        order = generateNewOrder(order)
        currentIndex = 0
    } 
}

function setUIMode(mode: UIMode) {
    uimode = mode
}

function setChapter(checkbox: HTMLInputElement)
{
    const chapterIndex = Number(checkbox.id)
    if (checkbox.checked)
    {
        SELECTED_CHAPTERS.push(chapterIndex)
        order = shuffle(listAspectsFromChapters(indexesToChapters(SELECTED_CHAPTERS, CHAPTERS)))
    } else {
        const index = SELECTED_CHAPTERS.indexOf(chapterIndex, 0);
        if (index > -1) {
            SELECTED_CHAPTERS.splice(index, 1);
        } else {
            console.log("Something whent wrong")
        }
    }
    showAbleToLearnState(SELECTED_CHAPTERS.length > 0)
}

function startLearning() {
    const allowLearning = SELECTED_CHAPTERS.length > 0
    showingChapterSelectError(!allowLearning)
    console.log(allowLearning)
    if (allowLearning) {
        renderNewAspect(order[currentIndex])
        setUIMode(UIMode.Learning)
        renderUIMode(uimode)
    }    
}

function backToChapterSelect(): void {
    setUIMode(UIMode.ChapterSelect)
    renderUIMode(uimode)
}

// --- Runtime ---

getChapters() 
    .then((chapters: [Chapter]) =>{
        CHAPTERS = chapters
        renderUIMode(uimode)        
        renderChapterselect(CHAPTERS)
    })

// Runs when the user presses enter
function answerTextfieldOnEnter(event: KeyboardEvent): void {
    if (event.key == "Enter") {        
        const userInput = (document.getElementById("answerTextfield") as HTMLInputElement).value
        clearTextField()                

        if (!showingCorrectness) {            
            showingCorrectness = true
            showCorrectness(userInput, LearnMode.Id, order[currentIndex])
            setAspect()
        } else {
            showingCorrectness = false
            hideCorrectness()
            renderNewAspect(order[currentIndex])
        }        
    }
}

