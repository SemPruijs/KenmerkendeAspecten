const aspectUrl = "Content/KenmerkendeAspecten.json"
const asyncAspects = GetAspects()


function answerTextfieldOnEnter(event) {
    if (event.key === "Enter") {
        // check if correct
        console.log("Works")
    }
}

// Should be a positive number
function GetRandomNumberBelowNumber(number) {
    return Math.floor(Math.random() * number)
}

function randomIndexFromList(list) {
    // return Math.floor(Math.random() * list.length)
    return GetRandomNumberBelowNumber(list.length)
}

// TODO: Call this function on a chapter
function randomIndexFromChapter(aspects, chapter) {
    // return randomIndexFromChapter(aspects.chapters[chapter])
    return randomIndexFromList(aspects.chapters[chapter].aspects)
}

function RandomAspectFromChapter(aspects, chapter) {
    const randomIndex = randomIndexFromChapter(aspects, chapter)    
    const aspect = GetAspect(aspects, chapter, randomIndex)
    return aspect
}


// function GenerateAspect(aspectContent) {

//     console.log(aspectContent.chapters[0].title);
//     console.log(aspectContent.chapters[0].asyncAspects);
//     console.log(aspectContent.chapters[0].asyncAspects[0].id);
//     console.log(aspectContent.chapters[0].asyncAspects[0].aspect);

//     document.getElementById("question").innerHTML = aspectContent.chapters[0].asyncAspects[SelectedAspect()].aspect;
    
//     // console.log(aspectContent.chapters[0][0].aspect);
// }



async function GetAspects() {
    const res = await fetch(aspectUrl);
    const body = await res.json();

    return body;
}

function GetAspect(aspects, chapter, index) {
    return aspects.chapters[chapter].aspects[index]
}


async function renderAspect() {
    var aspects = await asyncAspects
    // const randomIndex = randomIndexFromChapter(aspects, 0)    
    // const question = GetAspect(aspects, 0, randomIndex).aspect
    document.getElementById("question").innerHTML = RandomAspectFromChapter(aspects, 0).aspect
}

renderAspect()



