const aspectUrl = "Content/KenmerkendeAspecten.json"
const asyncAspects = GenerateAspects()

function answerTextfieldOnEnter(event) {
    if (event.key == "Enter") {
        // check if correct
        console.log("Works")
    }
}

function randomIndexFor(list) {
    return Math.floor(Math.random() * list.length);
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



async function GenerateAspects() {
    const res = await fetch(aspectUrl);
    const body = await res.json();

    console.log(body);

    return body;
}

async function renderAspect() {
    var aspects = await asyncAspects
    document.getElementById("question").innerHTML = aspects.chapters[0].aspects[SelectedAspect()].aspect 
    // console.log("test)
    // console.log(aspects
}
// 
renderAspect()

// GenerateAspects();

