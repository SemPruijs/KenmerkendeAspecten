const aspectUrl = "Content/KenmerkendeAspecten.json"

// Gets json file, returns javascript object
function jsonToObject(jsonString) {
    return JSON.parse(jsonString);    
}

function GenerateAspect(jsonString) {
    let aspectContent = jsonToObject(jsonString);

    console.log(aspectContent.chapters[0].title);
    console.log(aspectContent.chapters[0].aspects);
    console.log(aspectContent.chapters[0].aspects[0].id);
    console.log(aspectContent.chapters[0].aspects[0].aspect);

    document.getElementById("question").innerHTML = aspectContent.chapters[0].aspects[0].aspect;
    
    // console.log(aspectContent.chapters[0][0].aspect);
}



function renderAspect() {
    makeAjaxCall("GET", aspectUrl, GenerateAspect);
}

renderAspect();

