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
const noteApp = $.querySelector(".note-app");
const body = $.querySelector("body");
// -> select button click :|
const btnAdd = $.querySelector(".btn-Add");
const btnClearAll = $.querySelector(".btn-clearAll");
const btnFilterAll = $.querySelector(".All");
const btnFilterComplete = $.querySelector(".Completed");
const btnFilterUnComplete = $.querySelector(".unCompleted");
const btnChangeTheme = $.querySelector(".changeTheme");


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

// -> The code section of the function load web note app page
function loadNoteAppHandler () {
    let receiveThemeLocalStorage = localStorage.getItem("themeNoteApp");
    receiveThemeLocalStorage === "Dark" ? changeThemeHandler() : null;
}




// -> set click event Listener for Click Button's Application
btnChangeTheme.addEventListener("click",changeThemeHandler);
// -> set click event Listener for Window and Document Self
window.addEventListener("load",loadNoteAppHandler);