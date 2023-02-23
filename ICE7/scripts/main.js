(function () {

    function DisplayHome(){
    // least amount of memory heap
    // let randomButton = document.getElementById("randomButton")
    // randomButton.addEventListener("click", function(){
    //     location.href = './projects.html'
    // })

    //most amount of memory heap
    $("#randomButton").on("click", function(){
        location.href = 'contact.html'
    })

    // second most amount of memory heap - js queryselectorall
    // document.querySelectorAll("#randomButton").forEach(element => {
    //     element.addEventListener("click", () => {
    //         location.href = `contact.html`
    //     })
    // })

        let mainContent  = document.getElementsByTagName("main")[0]
        //console.log(mainContent)
        mainContent.setAttribute("class", "container")
        documentBody = document.body

        let mainParagraph = document.createElement("p")
        mainParagraph.setAttribute("id", "MainParagraph")
        mainParagraph.setAttribute("class", "mt-3 container")

        let firstString = "This is a "
        let secondString = `${firstString} paragraph that we added through javascript`
        //mainParagraph.textContent = secondString

        mainContent.appendChild(mainParagraph)

        $("main").addClass("container").append(`<p id="mainParagraph" class="mt-3 container">${secondString}</p>`)
    }

    function DisplayProjects(){
        console.log("Projects Page")
    }

    function TestFullName(){
        let messageArea = $('#messageArea').hide()

        let fullNamePattern = /^([A-Z][a-z]{1,25})((\s|,|-)([A-Z][a-z]{1,25}))*(\s|,|-)*([A-Z][a-z]{1,25})*$/g 

        $('#fullName').on("blur", function(){
            let fullNameText = $(this).val()

            if (!fullNamePattern.test(fullNameText)){
                //failure to match full name iwth regex
                $(this).trigger("focus").trigger("select")
                

                messageArea.addClass("alert alert-danger")
                messageArea.text("Please enter a valid full name which means a capitalized first name and capitalized last name")
                messageArea.show()
            }else{
                // success in mathcing full name with regex
                messageArea.removeAttr("class")
                messageArea.hide()
            }
        })
    }
    // create regular expression for contect number that takes optional set of brackets, dashes and spacing. First set of digets must be max min of three and last are max min of 4


    function DisplayContacts(){
        console.log("Contacts Page")

        TestFullName()

        let submitButton = document.getElementById("submitButton")
        let subscribeCheckbox = document.getElementById("subscribeCheckbox")

        //Local Storage
        /*localStorage.setItem("Random Variable", "Random variable for testing and demonstration")
        console.log(localStorage.getItem("Random Variable"))
        localStorage.removeItem("Random Variable")*/

        //console.log("Contacts Page")


        submitButton.addEventListener("click", function(){
            //event.preventDefault
            if (subscribeCheckbox.checked){
                //if the user subscribes store the contact in local storage
                let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value)
                if (contact.serialize()){
                    let key = contact.Name.substring(0, 1) + Date.now()
                    localStorage.setItem(key, contact.serialize())
                }
            }
        })
    }

    function AddContact(fullName, contactNumber, emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress)
                if (contact.serialize()) {
                    let key = contact.Name.substring(0, 1) + Date.now()
                    localStorage.setItem(key, contact.serialize())
                }
    }

    function DisplayContactList(){

        if (localStorage.length > 0){

            let contactList = document.getElementById("contactList") // Our contact list in the table of the contact list page
            let data = "" //Add data to this variable. Append deserialized data from LocalStorage to data
            let keys = Object.keys(localStorage)//Return a String Array of keys
            let index = 1 // Count the number of keys
            
            //For every key in the keys collection
            for (const key of keys) {
                let contactData = localStorage.getItem(key) //Get localStorage data value related to the key
                let contact = new core.Contact()
                contact.deserialize(contactData)

                //Inject repeatable row into the contact list
                data += `<tr>
                    <th scope="row" class="test-center">${ index }</th>
                    <td class="text-center">${ contact.Name }</td>
                    <td class="text-center">${ contact.ContactNumber }</td>
                    <td class="text-center">${ contact.EmailAddress }</td>
                    <td class="text-center">
                    <td class="text-center"><button value="${ key }" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i>&nbsp; Edit</button></td>
                    <td class="text-center"><button value="${ key }" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i>&nbsp; Delete</button></td>
                `
                

                index++
            }

            contactList.innerHTML = data
            $("button.delete").on("click", function() {
                if (confirm("Are you sure you want to delete contact?"))
                localStorage.removeItem($(this).val());

                location.href = 'contact-list.html'
            })

            $("button.edit").on("click", function(){
                location.href='edit.html#' + $(this).val()
            })
        }

    
        $("#addButton").on("click", () => {
            location.href = 'edit.html#Add'
        })

    }

    function DisplayEditPage() {
        let page = location.hash.substring(1)

        switch(page) {
            case "Add":
                {
                    $("#welcome").text("WEBD6201 Demo Add Contact")

                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`)

                    $("#editButton").on("click", (event) => {
                        event.preventDefault()

                        // get form information (name, contact number, email address)
                        AddContact(fullName.value, contactNumber.value, emailAddress.value)

                        // redirect to contact-list
                        location.href = 'contact-list.html'
                    })
                }
                break
            default:
                {
                    
                    let contact = new core.Contact()
                    contact.deserialize(localStorage.getItem(page))
                    
                    $("#fullName").val(contact.Name)
                    $("#contactNumber").val(contact.ContactNumber)
                    $("#emailAddress").val(contact.EmailAddress)

                    $("#editButton").on("click", (event) =>{
                        event.preventDefault()
                        // get all changes from the form
                        contact.Name = $("#fullName").val()
                        contact.ContactNumber = $("#contactNumber").val()
                        contact.EmailAddress = $("#emailAddress").val()
                        // relpace the changes in localstorage

                        localStorage.setItem(page, contact.serialize())

                        // fo oback to conatct-list.html
                        location.href = 'contact-list.html'
                    })
                }
                break
        }
    }
    
    function DisplayReferences() {
        console.log("References Page")
    }

    function Start() {
        console.log("App Started!")
        
        switch (document.title){
            case "Homepage - WEBD6201 Demo":
                DisplayHome()
                break
            case "Projects - WEBD6201 Demo":
                DisplayProjects()
                break
            case "Contact Us - WEBD6201 Demo":
                DisplayContacts()
                break
            case "Contact List - WEBD6201 Demo":
                DisplayContactList()
                break
            case "References - WEBD6201 Demo":
                DisplayReferences()
                break
            case "Edit - WEBD6201 Demo":
                DisplayEditPage()
                break
        }
    }

    window.addEventListener("load", Start)
})()