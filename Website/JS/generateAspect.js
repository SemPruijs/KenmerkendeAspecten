const ASPECT_URL = "Content/KenmerkendeAspecten.json"
const ASYNC_ASPECTS = getAspects()
// var currentAspect = randomAspectFromChapter()


function answerTextfieldOnEnter(event) {
    if (event.key === "Enter") {
        // check if correct
        console.log("Works")
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

function randomAspectFromChapter(aspects, chapter) {
    const RANDOM_INDEX = randomIndexFromChapter(aspects, chapter)    
    const ASPECT = getAspect(aspects, chapter, RANDOM_INDEX)
    return ASPECT
}


// function GenerateAspect(aspectContent) {

//     console.log(aspectContent.chapters[0].title);
//     console.log(aspectContent.chapters[0].asyncAspects);
//     console.log(aspectContent.chapters[0].asyncAspects[0].id);
//     console.log(aspectContent.chapters[0].asyncAspects[0].aspect);

//     document.getElementById("question").innerHTML = aspectContent.chapters[0].asyncAspects[SelectedAspect()].aspect;
    
//     // console.log(aspectContent.chapters[0][0].aspect);
// }



async function getAspects() {
    const RES = await fetch(ASPECT_URL);
    const BODY = await RES.json();

    return BODY;
}

function getAspect(aspects, chapter, index) {
    return aspects.chapters[chapter].aspects[index]
}


async function renderAspect() {
    var aspects = await ASYNC_ASPECTS
    document.getElementById("question").innerHTML = randomAspectFromChapter(aspects, 0).value
}

renderAspect()



