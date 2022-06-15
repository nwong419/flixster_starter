//const API_KEY = e3bdfddfeebbac2a8f116ab1f25a51f1;
const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=e3bdfddfeebbac2a8f116ab1f25a51f1";
const IMGURL = "https://image.tmdb.org/t/p/w300/";

const movieGrid = document.querySelector(".movie-grid");
async function getMovies() {
    const response = await fetch(APIURL);
    const data = await response.json();
    console.log(data);
    showMovies(data.results);
}


function showMovies(movies) {
    movieGrid.innerHTML = "";
    movies.forEach((movie) => {
        const {backdrop_path, title, popularity, poster_path, vote_count} = movie;
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        //console.log(IMGURL+poster_path);
        movieCard.innerHTML =  `
            <div id="movie-info">
                <h2>${title}</h2>
                <h4>Votes: ${vote_count}</h4>
            </div>
            <img src="${IMGURL + poster_path}" alt="${title}" />
            `
        movieGrid.appendChild(movieCard);
    });
}

window.onload = function () {
    getMovies();
}


// function addMovieCard(movieGrid, movieCard){
//     movieCard.innerHTML = `
//     `;
// }