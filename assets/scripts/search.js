import { getMoviesByNameWithApi } from "./api.js";

const serchSubmitBtn = document.querySelector(".search-submit");
const searchInput = document.querySelector("#searchSide .search-input");
const searchWrapperResults = document.querySelector("#searchSide .search-wrapper-results");

function initialApp() {
  addEvent();
}

initialApp();

function addEvent() {
  serchSubmitBtn.addEventListener("click", (btn) => {
    btn.preventDefault();
    let searchValue = searchInput.value;
    if (!searchValue == "") {
      getMovieNameFromApi(searchValue);
    }
  })
}

async function getMovieNameFromApi(name) {
  let movie = await getMoviesByNameWithApi(name);
  diplaySearchMovies(movie);
}

function diplaySearchMovies(theMovie) {
  let moviesSearchHtmlContent = theMovie.map((movie) => {
    return ` <a href="../singlemovie/singlemovie.html?id=${movie.id}" class="d-flex gap-2 my-2 p-2 border">
        <div class="image">
          <img
            class="w-100"
            src="${movie.image}"
            alt=""
          />
        </div>
        <div class="movie-info">
          <div class="d-flex gap-2">
          <p class="movie-name mb-1">${movie.name}</p>
          <p class="movie-genre mb-1">(${movie.genre})</p>
          </div>
          <p class="movie-runningTime mb-1">Running time : ${movie.runningTime}</p>
          <span>(${movie.language})</span>
        </div>
      </a>`
  })
  searchWrapperResults.innerHTML = moviesSearchHtmlContent.join("");
  if (searchWrapperResults.innerHTML == "") {
    return searchWrapperResults.innerHTML = `<p class="my-2 p-2">No Search Results Found </p>`
  }
}