let movieObj = {
    date: "16/11/1995",
    movies: []
};
console.log(movieObj)
movieObj.movies.push("maysara");
movieObj.movies.push("marwan");
console.log(movieObj)

if (movieObj.date == "16/11/1996") {
    console.log(movieObj)
} else if (movieObj.date == "16/11/1995") {
    console.log("found")
    console.log(movieObj.movies)
}