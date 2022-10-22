const aspectUrl = "Content/KenmerkendeAspecten.json"
const asyncAspects = GetAspects()


function answerTextfieldOnEnter(event) {
    if (event.key == "Enter") {
        // check if correct
        console.log("Works")
    }
}

function randomIndexFor(list) {
    return Math.floor(Math.random() * list.length);
}

// TODO: Call this function on a chapter
async function randomIndexFromChapter(chapter) {
    var aspects = await asyncAspects
    return randomIndexFromChapter(aspects.chapters[chapter])
}

function SelectedAspect() {
    return 1;
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

    console.log(body);

    return body;
}

function GetAspect(aspects, chapter, index) {
    return aspects.chapters[chapter].aspects[index]
}



async function renderAspect() {
    var aspects = await asyncAspects
    document.getElementById("question").innerHTML = GetAspect(aspects, 0, 0).aspect
}

renderAspect()



