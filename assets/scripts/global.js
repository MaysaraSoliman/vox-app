const headerSearchIcon = document.querySelectorAll(".search-icon");
const searchFormBar = document.querySelector("#searchSide .search-bar");
const searchInput = document.querySelector("#searchSide .search-input");
const emptyIcon = document.querySelector("#searchSide .empty-icon");
const searchSide = document.querySelector("#searchSide");


function addEventsHeader() {
    headerSearchIcon.forEach((searchIcon) => {
        searchIcon.addEventListener("click", () => {
            removeHiddenClass(searchFormBar);
            focusOnInput(searchInput);
            searchSide.classList.toggle("active-transition");
        })
    })

    emptyIcon.addEventListener("click", () => emptyingInput(searchInput));
}

addEventsHeader();

function removeHiddenClass(aClass) {
    aClass.classList.toggle("hidden");
}

function addActiveClass(aClass) {
    aClass.classList.add("active");
}

function removeActiveClass(list) {
    list.forEach((el) => {
        el.classList.remove("active");
    })
}

function focusOnInput(aInput) {
    aInput.focus();
}

function emptyingInput(aInput) {
    aInput.value = "";
}

export { addActiveClass, removeActiveClass }
