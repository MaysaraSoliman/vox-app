async function getMoviesByApi() {
    let respone = await fetch("http://localhost:3000/movies");
    let data = await respone.json();
    return data
}

async function getSortMoviesByApi(sort) {
    let respone = await fetch(`http://localhost:3000/movies?_sort=name&_order=${sort}`);
    let data = await respone.json();
    return data
}

async function getFilterMoviesLanguageByApi(filter) {
    let respone = await fetch(`http://localhost:3000/movies?language=${filter}`);
    let data = await respone.json();
    return data
}

async function getFilterMoviesByIdWithApi(id) {
    let respone = await fetch(`http://localhost:3000/movies?id=${id}`);
    let data = await respone.json();
    return data
}

async function getLimitedMoviesAndExcludeOneByApi(id) {
    let respone = await fetch(`http://localhost:3000/movies?id_ne=${id}&_limit=8`);
    let data = await respone.json();
    return data
}

export { getMoviesByApi, getSortMoviesByApi, getFilterMoviesLanguageByApi, getFilterMoviesByIdWithApi, getLimitedMoviesAndExcludeOneByApi }