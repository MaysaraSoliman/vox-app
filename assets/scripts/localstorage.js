function addToLocalStorage(storage, item) {
    return window.localStorage.setItem(storage, JSON.stringify(item))
}

function getFromLocalStorage(item) {
    return JSON.parse(localStorage.getItem(item)) || [];
}

export { addToLocalStorage, getFromLocalStorage }
