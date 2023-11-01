const posterMovie = document.querySelector(".poster-wall .poster-movie");
console.log(posterMovie);
const url = posterMovie.href;
console.log(url)

const searchParams = new URLSearchParams(url);
console.log(searchParams)