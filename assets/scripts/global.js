const headerSearchIcon = document.querySelectorAll("#header .search-icon");
const searchFormBar = document.querySelector("#header .search-bar");
const searchInput = document.querySelector("#header .search-input");
const emptyIcon = document.querySelector("#header .empty-icon");


function addEventsHeader() {
    headerSearchIcon.forEach((searchIcon) => {
        searchIcon.addEventListener("click", () => {
            removeHiddenClass(searchFormBar);
            focusOnInput(searchInput);
        })
    })

    emptyIcon.addEventListener("click", () => emptyingInput(searchInput));
}

addEventsHeader();

function removeHiddenClass(aClass) {
    aClass.classList.toggle("hidden");
}

function focusOnInput(aInput) {
    aInput.focus();
}

function emptyingInput(aInput) {
    aInput.value = "";
}
