import { getMoviesByApi, getSortMoviesByApi, getFilterMoviesLanguageByApi } from "./api.js";

const moviesWrapper = document.querySelector(".movies-wrapper");
// const sortBy = document.querySelector(".sort-by-selection");
const filterBy = document.querySelector(".filter-by-selection");


function intialApp() {
  getAllMovies();
  addEvents();
}
intialApp();

function addEvents() {
  // sortBy.addEventListener("change", () => {
  //   if (sortBy.value == "recommended") {
  //     displayMovies()
  //   } else {
  //     displaySortMovies(sortBy.value);
  //   }
  // })

  filterBy.addEventListener("change", () => {
    if (filterBy.value == "All") {
      getAllMovies()
    } else {
      getFilterMoviesByLanguage(filterBy.value);
    }
  })

}

function displayTheMovies(movies) {
  let moviesHtmlContent = movies.map((movie) => {
    return `   <div class="col-6 col-md-4 col-lg-3">
        <div class="movie-card">
          <div class="image">
            <img class="w-100" src="${movie.image}" alt="" />
          </div>
          <h3 class="movie-name">
            <a class="fs-5" href="http://127.0.0.1:5500/singlemovie/singlemovie.html?id=${movie.id}" data-id="${movie.id}">${movie.name}</a>
          </h3>
          <p class="movie-language d-flex flex-wrap">
            <strong>Language: </strong>
            ${movie.language}
          </p>
          <button
          type="button"
          class="show-times main-button border-0 btn-md d-flex w-sm-100 my-4  py-2 px-3 rounded"
        >
        <a class="my-0 text-white" href="http://127.0.0.1:5500/singlemovie/singlemovie.html?id=${movie.id}" data-id="${movie.id}"> Show times</a>
        </div>
      </div>
    `
  })

  moviesWrapper.innerHTML = moviesHtmlContent.join("")
}

async function getAllMovies() {
  let movies = await getMoviesByApi();
  displayTheMovies(movies);
}

async function getFilterMoviesByLanguage(value) {
  let filter = value;
  let filteredMovies = await getFilterMoviesLanguageByApi(filter);
  displayTheMovies(filteredMovies)
}


// async function displaySortMovies(value) {
//   let sort = value;
//   let sortedMovies = await getSortMoviesByApi(sort);
//   let moviesHtmlContent = sortedMovies.map((movie) => {
//     return `   <div class="col-6 col-md-4 col-lg-3">
//         <div class="movie-card">
//           <div class="image">
//             <img class="w-100" src="${movie.image}" alt="" />
//           </div>
//           <h3 class="movie-name">
//             <a class="fs-5" href="">${movie.name}</a>
//           </h3>
//           <p class="movie-language d-flex flex-wrap">
//             <strong>Language: </strong>
//             ${movie.language}
//           </p>
//           <button
//           type="button"
//           class="show-times main-button border-0 btn-md d-flex w-sm-100 my-4  py-2 px-3 rounded"
//         >
//         <a class="my-0 text-white" href=""> Show times</a>
//         </div>
//       </div>
//     `
//   })

//   moviesWrapper.innerHTML = moviesHtmlContent.join("")
// }



