(function () {
    
    function DisplayButton(){
        let randomButton = document.getElementById("randomButton")
        randomButton.addEventListener("click", function(){
            location.href ="./projects.html"
        })

        let mainContent = document.getElementsByTagName("main")[0]
        mainContent.setAttribute("class", "container")

        console.log(mainContent)

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")

        let firstString = "This is a main paragraph that we added through javascript"

        mainParagraph.textContent = firstString

        mainContent.appendChild(mainParagraph) // adds something after it was written.
    }

    let michael = new contact("Michael Parisi", "4168037854", "michael.parisi@dcmail.ca")
    console.log(michael.toString())

    function Start() {
        console.log("App Started!")
        
        switch (document.title){
            case "Home - WEBD6201 Demo":
                DisplayButton()
                break
            case "Projects - Demo":
                DisplayButton()
                break
        }
    }

    window.addEventListener("load", Start)
})()