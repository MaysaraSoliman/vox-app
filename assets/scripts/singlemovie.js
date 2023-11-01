import { getFilterMoviesByIdWithApi, getLimitedMoviesAndExcludeOneByApi } from "./api.js";

const movieWrapper = document.querySelector(".movie-wrapper");
let sliderContainer = document.querySelector("#moviesYouMightLike .slider-container");

function intialApp() {
  getUrlParamOfMovieId();
}

intialApp();

async function getUrlParamOfMovieId() {
  const querystring = window.location.search;
  let urlParam = new URLSearchParams(querystring);
  let value = urlParam.get('id');
  getFilterMoviesById(value);
  getLimitedMoviesAndExcludeMainMovie(value);
}

async function getFilterMoviesById(id) {
  let ID = id;
  let filterIdMovie = await getFilterMoviesByIdWithApi(ID);
  displayTheMovie(filterIdMovie);
}

async function getLimitedMoviesAndExcludeMainMovie(id) {
  let ID = id;
  let filterIdMovie = await getLimitedMoviesAndExcludeOneByApi(ID);
  displayTheSlider(filterIdMovie);
}

function displayTheMovie(theMovie) {
  let moviesHtmlContent = theMovie.map((movie) => {
    return `      <div
    class="theSingleMovie-head d-flex justify-content-between align-items-center flex-wrap"
  >
    <div class="py-2 mb-3 me-4">
      <h2 class="main-heading pt-1 fs-3">${movie.name}</h2>
    </div>
  </div>
  <div class="movie-poster-trailer row">
              <div class="poster-column d-none d-sm-block col-4 p-1 p-md-2">
                <div class="poster h-100">
                  <img
                    class="w-100 h-100"
                    src="${movie.image}"
                    alt=""
                  />
                </div>
              </div>
              <div class="trailer-column col-12 col-sm-8 p-auto p-sm-1 p-md-2">
                <div class="trailer h-100">
                  <iframe
                    class="w-100 h-100"
                    width=""
                    height=""
                    src="${movie.trailer}"
                    frameborder="0"
                    allowfullscreen="true"
                    allowtransparency="true"
                    data-ot-ignore=""
                    data-gtm-yt-inspected-1888546_1219="true"
                    data-gtm-yt-inspected-1888546_1141="true"
                    data-gtm-yt-inspected-87="true"
                    title="${movie.title}"
                  ></iframe>
                </div>
              </div>
            </div>
            <button
            type="button"
            class="view-showtimes main-button border-0 btn-md d-flex mx-auto my-4 py-2 px-3 rounded"
          >
            <a class="text-white" href="">
              View Showtimes</a
            >
          </button>
          <div class="dashed"></div>
          <div class="row py-4">
              <aside class="col-12 col-sm-4">
                <p>
                  <strong>Genre: </strong>
                  ${movie.genre}
                </p>
                <p>
                  <strong>Running Time : </strong>
                  ${movie.runningTime}
                </p>
                <p>
                  <strong>Release Date : </strong>
                  ${movie.releaseDate}
                </p>
                <p>
                  <strong>Starring : </strong>
                  ${movie.starring} 
                </p>
                <p>
                  <strong>Language : </strong>
                  ${movie.language}
                </p>
              </aside>
              <article class="col-12 col-sm-8">
                <p class="lh-lg">
                  ${movie.description}
                </p>
              </article>
            </div>
        `
  })

  movieWrapper.innerHTML = moviesHtmlContent.join("")
}

function displayTheSlider(theMovie) {
  let moviesSliderContent = theMovie.map((movie) => {
    return `<div class="box border p-2">
  <div class="movie-card">
    <div class="image">
      <img class="w-100 h-100" src="${movie.image}" alt="" />
    </div>
    <h3 class="movie-name fs-5 py-2">
      <a href="http://127.0.0.1:5500/singlemovie/singlemovie.html?id=${movie.id}">${movie.name}</a>
    </h3>
   
    <button
    type="button"
    class="show-times main-button border-0 btn-sm d-flex w-sm-100 my-2 py-2 px-3 rounded"
  >
    <a class="text-white" href="http://127.0.0.1:5500/singlemovie/singlemovie.html?id=${movie.id}">Show times</a>
  </div>
</div>`
  })
  sliderContainer.innerHTML = moviesSliderContent.join("");
  sliderScroll()
}

// slider function



function sliderScroll() {
  const arrow = document.querySelectorAll("#moviesYouMightLike i");
  let movieCardBox = document.querySelector("#moviesYouMightLike .slider-container .box ");
  arrow[0].addEventListener("click", () => {
    sliderContainer.scrollLeft -= movieCardBox.clientWidth + 10;
  })

  arrow[1].addEventListener("click", () => {
    sliderContainer.scrollLeft += movieCardBox.clientWidth + 10;

  })
}
// sliderScroll()


