//* get start code JavaScript for Note Application
// -> select element HTML let <-
let $ = document;
let theme = "Light";
// -> select element HTML const <-
const innerTitle = $.querySelector(".input-title");
const innerDate = $.querySelector(".input-date");
const innerContent = $.querySelector(".input-content");
// -> select element HTML Main <-
const dataBaseNote = $.querySelector(".box-note-items");
const countNote = $.querySelector(".count-note");
const modal = $.querySelector(".modal-main");
const nameModal = $.querySelector(".name-modal");
const titleModal = $.querySelector(".title-modal");
const percentModal = $.querySelector(".percent-modal");
const noteApp = $.querySelector(".note-app");
const body = $.querySelector("body");
const selectBackColorNote = $.querySelector(".select-backcolor");
// -> select button click :|
const btnAdd = $.querySelector(".btn-Add");
const btnClearAll = $.querySelector(".btn-clearAll");
const btnFilterAll = $.querySelector(".All");
const btnFilterComplete = $.querySelector(".Completed");
const btnFilterUnComplete = $.querySelector(".unCompleted");
const btnChangeTheme = $.querySelector(".changeTheme");


// array note app
let arrayNote = [];

// -> The code section of the function check input validation and add notes
function getCheckInputHandler () {
    let titleNote,dateNote,contentNote;
    titleNote = innerTitle.value.trim(); 
    dateNote = innerDate.value.trim(); 
    contentNote = innerContent.value.trim();

    // check input
    if (!titleNote || !dateNote || !contentNote) {
        showModalHandler();
    } else {
        // process for create note

        // Create a new data note 
        let newDataNote = {
            id :Math.floor( 10000 + Math.random() * 90000), 
            title : titleNote,
            content : contentNote,
            date : dateNote,
            complete : false,
            color : innerTitle.style.backgroundColor,
        };

        // push new Data to array note app
        arrayNote.push(newDataNote);
        // save note to local storage 
        saveToLocalStorage(arrayNote);
        // Create new Note Item
        createNoteHandler(arrayNote);
        // change count of note item
        statusNoteItemHandler(arrayNote);


        // Clear input and data to input
        innerTitle.value = "";
        innerDate.value = "";
        innerContent.value = "";
        innerTitle.style.backgroundColor = "#fff";
        innerDate.style.backgroundColor = "#fff";
        innerContent.style.backgroundColor = "#fff";

        innerTitle.focus();
    }
}


// -> save to local storage
function saveToLocalStorage (arrayNote) {
    localStorage.setItem("noteList",JSON.stringify(arrayNote));
}


// -> The code section of the function load web note app page
function loadNoteAppHandler () {
    let receiveThemeLocalStorage = localStorage.getItem("themeNoteApp");
    let receiveDataNote = JSON.parse(localStorage.getItem("noteList"));
    receiveThemeLocalStorage === "Dark" ? changeThemeHandler() : null;

    arrayNote = receiveDataNote;

    if (arrayNote === null) {
        arrayNote = [];
    } else {
        saveToLocalStorage(arrayNote);
        createNoteHandler(arrayNote);
        statusNoteItemHandler(arrayNote);
    }
}


// -> Create a new note item 
function createNoteHandler (arrayNote) {
    let newNoteItem,newBodyNote,newActionNote,newBox;
    let  newNoteID,cardTitle,cardText,cardDate,btnComplete,btnRemove;

    dataBaseNote.innerHTML = "";

    // Create new Note Item
    arrayNote.forEach(function (note) {

        // new ID Note Item 
        newNoteID = $.createElement("input");
        newNoteID.type = "hidden";
        newNoteID.value = note.id;

        
        // new note item
        newNoteItem = $.createElement("div");
        newNoteItem.className = "card p-2";
        newNoteItem.style.width = "25rem";
        newNoteItem.style.height = "12rem";
        newNoteItem.style.backgroundColor = note.color;

        // new card body note item
        newBodyNote = $.createElement("div");
        newBodyNote.classList.add("card-body");

        // new Title note item
        cardTitle = $.createElement("h5");
        cardTitle.className ="card-title fw-bold";
        cardTitle.innerHTML = note.title;

        // new card text note item
        cardText = $.createElement("p");
        cardText.className = "card-text box-text";
        cardText.innerHTML = note.content;

        // new action note item
        newActionNote = $.createElement("div");
        newActionNote.className = "d-flex flex-row justify-content-between align-items-center";

        // new action button
        newBox = $.createElement("div");
        newBox.className = "d-flex flex-row justify-content-start align-items-center";

        // new Date note item
        cardDate = $.createElement("h5");
        cardDate.className = "fs-6 date";
        cardDate.innerHTML = note.date;

        // new button complete
        btnComplete = $.createElement("button");
        btnComplete.className = "btn-complete btn btn-success ms-1";
        btnComplete.innerHTML = `<i class='fa fa-check'></i>`;
        btnComplete.setAttribute("onclick", 'completeNoteHandler('+ note.id +')');

        // new button Remove
        btnRemove = $.createElement("button");
        btnRemove.className = "btn-remove btn btn-danger ms-1";
        btnRemove.innerHTML = `<i class='fa fa-trash'></i>`;
        btnRemove.setAttribute("onclick",'removeNoteHandler('+ note.id +')');

        // check status or complete note item
        if (note.complete) {
            newNoteItem.classList.add("completeON");
            btnComplete.innerHTML = `<i class='fa fa-check fa-bounce'></i>`;
        }

        // append data to element's Dom
        newNoteItem.append(newBodyNote,cardTitle,cardText,newActionNote);
        newBox.append(btnRemove,btnComplete,newNoteID);
        newActionNote.append(newBox,cardDate);

        // send data to dataBase
        dataBaseNote.appendChild(newNoteItem);
    });
}


// -> complete note item
function completeNoteHandler (targetID) {
    let receiveDataNote = JSON.parse(localStorage.getItem("noteList"));
    arrayNote = receiveDataNote;
 

    arrayNote.forEach(function (note) {
        targetID === note.id ? note.complete = !note.complete : null;
    });


    saveToLocalStorage(arrayNote);
    createNoteHandler(arrayNote);
}



// -> remove note item
function removeNoteHandler (targetID) {
    let receiveDataNote = JSON.parse(localStorage.getItem("noteList"));
    let noteItem = dataBaseNote.querySelectorAll(".card");
    let findIndex = "";
    let timer = 0;
    arrayNote = receiveDataNote;

    // find Index
    findIndex = arrayNote.findIndex(function (note) {
        return targetID === note.id;
    });


    noteItem.forEach(function (note) {
        if (Number(note.querySelector("input").value) === targetID) {
            let sum = note.lastChild.lastChild;
            let timerRemove = setInterval(function () {
                timer++;
                sum.innerHTML = `${timer}%`;
                if (timer > 99) {
                    timer = 0;
                    clearInterval(timerRemove);
                    arrayNote.splice(findIndex , 1);
                    saveToLocalStorage(arrayNote);
                    createNoteHandler(arrayNote);
                    statusNoteItemHandler(arrayNote);
                }
        } , 30);
        }
    }); 
}


// change status of note item to added and removed
function statusNoteItemHandler (arrayNote) {
    countNote.innerHTML = `You Have ${arrayNote.length} Tasks in total`;
}




// -> show note item all
function btnFilterAllHandler () {
    let receiveDataNote = JSON.parse(localStorage.getItem("noteList"));
    arrayNote = receiveDataNote;


    createNoteHandler(arrayNote);
}



// -> show note item Filter Completed
function btnFilterCompleteHandler () {
    let receiveDataNote = JSON.parse(localStorage.getItem("noteList"));
    let completeOn = "";
    
    arrayNote = receiveDataNote;

    completeOn = arrayNote.filter(function (note) {
        return note.complete === true;
    });

    arrayNote = completeOn;
    createNoteHandler(arrayNote);
}



// -> show note item Filter unCompleted
function btnFilterUnCompleteHandler () {
    let receiveDataNote = JSON.parse(localStorage.getItem("noteList"));
    let uncomplete = "";


    arrayNote = receiveDataNote;
    uncomplete = arrayNote.filter(function (note) {
        return note.complete === false;
    });

    arrayNote = uncomplete;
    createNoteHandler(arrayNote);
}


// -> change theme color
function changeColorNoteHandler (e) {
    let targetValue = e.target.value;
    switch (targetValue) {
        case "White":
            innerTitle.style.backgroundColor = "#fff";
            innerDate.style.backgroundColor = "#fff";
            innerContent.style.backgroundColor = "#fff";
            break;
        case "Green":   
            innerTitle.style.backgroundColor = "#11998e";
            innerDate.style.backgroundColor = "#11998e";
            innerContent.style.backgroundColor = "#11998e";
            break;
        case "Blue":
            innerTitle.style.backgroundColor = "#6DD5FA";
            innerDate.style.backgroundColor = "#6DD5FA";
            innerContent.style.backgroundColor = "#6DD5FA";
            break;
        case "Blueviolet":
            innerTitle.style.backgroundColor = "#A770EF";
            innerDate.style.backgroundColor = "#A770EF";
            innerContent.style.backgroundColor = "#A770EF";
            break;
    }
}





// -> show Modal and Change title and content Modal
function showModalHandler () {
    let timer = "";
    let percent = 0;
    anime({
        targets: '.modal-main',
        translateY: 250,
    });
    noteApp.style.filter = 'blur(15px)';
    titleModal.innerHTML = "All inputs must be filled";
    modal.style.display = "block";
    timer = setInterval(function () {
        percent++;
        percentModal.innerHTML = `${percent}%`;
        if (percent > 100) {    
            anime({
                targets: '.modal-main',
                translateY: -250,
            });
            noteApp.style.filter = 'blur(0px)';
            modal.style.display = "none";
            clearInterval(timer);
            percent = 0;
        }
    } ,40);
}




// -> The code section of the function to change the theme
function changeThemeHandler () {
    if (theme === "Light") {
        applyDarkThemeHandler(body,noteApp);
        theme = "Dark";
    } else {
        applyLightThemeHandler(body,noteApp);
        theme = "Light";
    }

    // set the theme active to local storage
    localStorage.setItem("themeNoteApp", theme);
}


// -> apply Dark Mode 
function applyDarkThemeHandler (body,noteApp) {
    body.classList.replace("bg-body-tertiary","bg-darkMode");
    body.classList.replace("text-light","text-dark");
    noteApp.classList.replace("text-dark","text-light");
}

// -> apply Light Mode
function applyLightThemeHandler (body,noteApp) {
    body.classList.replace("bg-darkMode","bg-body-tertiary");
    body.classList.replace("text-dark","text-light");
    noteApp.classList.replace("text-light","text-dark");
}




// -> set click event Listener for Click Button's Application
btnAdd.addEventListener("click",getCheckInputHandler);
btnChangeTheme.addEventListener("click",changeThemeHandler);
btnFilterAll.addEventListener("click",btnFilterAllHandler);
btnFilterComplete.addEventListener("click",btnFilterCompleteHandler);
btnFilterUnComplete.addEventListener("click",btnFilterUnCompleteHandler);
selectBackColorNote.addEventListener("change",changeColorNoteHandler);
// -> set click event Listener for Window and Document Self
window.addEventListener("load",loadNoteAppHandler);