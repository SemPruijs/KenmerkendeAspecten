const aspectUrl = "Content/KenmerkendeAspecten.json"

function GenerateAspect(jsonString) {
    // clearProjectsContainer();

    // let input = document.getElementById("SearchBar").value;

    let aspectContent = JSON.parse(jsonString);
    // let projectsContainer = document.getElementById("ProjectsContainer");
    // aspectContent.Projects.forEach(Project => {
    //     var inputContainsTag = false
    //     Project.Tags.toUpperCase().split(", ").forEach(tag => {
    //         if (tag.includes(input.toUpperCase())) {
    //             inputContainsTag = true
    //         }
    //     })
    //     if (Project.Title.toUpperCase().includes(input.toUpperCase()) || input === "" || inputContainsTag) {
    //         console.log(input)
    //         //Make project section
    //         let projectSection = document.createElement("section");
    //         projectsContainer.appendChild(projectSection);

    //         //Generate title and content
    //         GenerateElement("h3", "projects__title", Project.Title, projectSection);
    //         GenerateElement("div", "projects__content", Project.Content, projectSection);

    //         //Generate buttons
    //         Project.Buttons.forEach(Button => {
    //             GenerateButton("a", Button.ButtonClass, Button.ButtonText, Button.ButtonHref, projectSection);
    //         })
    //     }
    // })
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

