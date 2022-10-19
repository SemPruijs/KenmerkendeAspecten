const aspectUrl = "Content/KenmerkendeAspecten.json"

function SelectedAspect() {
    return 1;
}

function GenerateAspect(aspectContent) {

    console.log(aspectContent.chapters[0].title);
    console.log(aspectContent.chapters[0].aspects);
    console.log(aspectContent.chapters[0].aspects[0].id);
    console.log(aspectContent.chapters[0].aspects[0].aspect);

    document.getElementById("question").innerHTML = aspectContent.chapters[0].aspects[SelectedAspect()].aspect;
    
    // console.log(aspectContent.chapters[0][0].aspect);
}



async function renderAspect() {
    const res = await fetch(aspectUrl);
    const body = await res.json();

    console.log(body);

    GenerateAspect(body);
}

renderAspect();

