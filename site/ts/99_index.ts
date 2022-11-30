// --- Constants and varibels ---

const ASPECT_URL = "content/kenmerkendeAspecten.json"
let SELECTED_CHAPTERS: Array<number> = []
let CHAPTERS: Array<Chapter> | null = null
let showingCorrectness = false
let order: Array<Aspect> | null = null
let currentIndex = 0
let uimode: UIMode = UIMode.ChapterSelect




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

getChapters(ASPECT_URL) 
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

