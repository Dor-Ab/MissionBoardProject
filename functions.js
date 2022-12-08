let stickyNotesArr = []
loadFromLocal()

function loadFromLocal() {
    let jsonArr = localStorage.getItem("notesArr")
    let parseArr = JSON.parse(jsonArr)

    if (parseArr) {
        stickyNotesArr = parseArr
        loadFromLocalAnimation()
    }
}

function loadFromLocalAnimation() {
    printNoteBook(" loadAnimation")
}

function getMissionValues() {
    event.preventDefault()
    let missionBodyBox = document.getElementById("missionBodyBox")
    let missionDateBox = document.getElementById("missionDateBox")
    let missionHourBox = document.getElementById("missionHourBox")

    let missionBody = missionBodyBox.value
    let missionDate = missionDateBox.value
    let missionHour = missionHourBox.value

    if (missionBody === "") {
        missionBodyBox.style.backgroundColor = "lightpink"
        missionBodyBox.focus()
        alert("Missing Mission!")
        event.preventDefault()
        return
    }
    missionBodyBox.style.backgroundColor = ""

    if (missionDate == "") {
        missionDateBox.style.backgroundColor = "lightpink"
        missionDateBox.focus()
        alert("Missing Date!")
        event.preventDefault()
        return
    }
    missionDateBox.style.backgroundColor = ""

    if (missionHour == "") {
        missionHourBox.style.backgroundColor = "lightpink"
        missionHourBox.focus()
        alert("Missing Hour!")
        event.preventDefault()
        return
    }
    missionHourBox.style.backgroundColor = ""

    let newStickyNote = {
        missionBody: missionBody,
        missionDate: missionDate,
        missionHour: missionHour
    }

    stickyNotesArr.push(newStickyNote)

    const jsonArr = JSON.stringify(stickyNotesArr)
    localStorage.setItem("notesArr", jsonArr)

    printNoteBook(" animationNew")

    missionBodyBox.value = ""
    missionDateBox.value = ""
    missionHourBox.value = ""
    missionBodyBox.focus()
}


function printNoteBook(NoteAnimation) {
    let stickyNoteContainer = document.getElementById("stickyNoteContainer")
    let newNote = ""
    let noteCounter = 0

    for (let item of stickyNotesArr) {
        newNote += `<div class="wrapDiv${NoteAnimation}" id="note${noteCounter}">
                        <div class="stickyNoteDiv">
                            <button onclick="deleteNote(${noteCounter})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            </button>

                            <p>${item.missionBody}</p><br>
                        </div>

                        <span class="hour">${item.missionHour}</span>
                        <span class="date">${item.missionDate}</span>
                    </div>`
        noteCounter++
    }
    stickyNoteContainer.innerHTML = newNote
}

function deleteNote(note) {
    stickyNotesArr.splice(note, 1)
    const jsonArr = JSON.stringify(stickyNotesArr)
    localStorage.setItem("notesArr", jsonArr)

    deleteNoAnimation()
}

function deleteNoAnimation() {
    printNoteBook("")
}

function missionBodyFocus() {
    let missionBodyBox = document.getElementById("missionBodyBox")

    missionBodyBox.focus()
}