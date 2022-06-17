const URLSHORT = "https://api.themoviedb.org/3/movie/";
const API_KEY = "e3bdfddfeebbac2a8f116ab1f25a51f1";
const APIURL = "https://api.themoviedb.org/3/discover/movie?api_key=";
const IMGURL = "https://image.tmdb.org/t/p/w300";
const NOWPLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key="+`${API_KEY}`;
const SEARCH = "https://api.themoviedb.org/3/search/movie?api_key="+`${API_KEY}`;
const movieGrid = document.querySelector(".movie-grid");

///get dom objects
const movieModal = document.querySelector(".movie-modal");
const movieVideo = document.getElementById("youtube");
const closeSpan = document.querySelector(".close");
const movieCard = document.querySelectorAll(".movie-card");
const searchBar = document.getElementById("bar");
const searchButton = document.getElementById("search-button");
const searchForm = document.querySelector(".search-bar");
const previousButton = document.getElementById("default");
const moreButton = document.getElementById("more");
const movieRuntime = document.querySelector(".modal-runtime");
const movieRelease = document.querySelector(".modal-release-date");
const movieGenre = document.querySelector(".modal-genre");
const moviePoster = document.getElementById("backdrop");
const movieDescription = document.querySelector(".modal-description");
//search term
var searchTerm = "";
var pageIndex = 1;
var resetBoolean = false;

//code for search functionality 
async function handleFormSubmit(event) {
    //prevent form from redirecting the page
    event.preventDefault();
    //clear the results page 
    movieGrid.innerHTML = "";
    //get search term value
    searchTerm = searchBar.value;
    //console.log(searchTerm);
    getMovies(searchTerm);
    //clear the search bar text
    searchBar.value = '';

}
//event listeners
searchForm.addEventListener("submit", handleFormSubmit);
previousButton.addEventListener("click", (e) => {
    //reset page index
    pageIndex = 1;
    resetBoolean = true;
    getMovies("")
});
moreButton.addEventListener("click", (e) => getMoreMovies(searchTerm));
closeSpan.addEventListener("click", (e) => {
    movieModal.classList.add("hidden");
    //stop video
    movieVideo.setAttribute("src", "about:blank");
    //movieModal.style.display = "none";
});

//should not reload whole page, only append
async function getMovies(searchTerm) {
    var URL = SEARCH+`&query=${searchTerm}`+`&page=${pageIndex}`;
    if (searchTerm == "") {
        URL = NOWPLAYING+`&page=${pageIndex}`;
    }
    //console.log(URL);
    const response = await fetch(URL);
    const data = await response.json();
    showMovies(data.results, resetBoolean);
    console.log(resetBoolean);
    //console.log(data);
}

async function getMoreMovies(searchTerm) {
    pageIndex++;
    resetBoolean = false;
    getMovies(searchTerm);
}

//modal popup
async function handleClick(id,overview) {
    movieModal.classList.remove("hidden");
    //get more details on specific movie
    const response = await fetch(URLSHORT+id+`?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data);
    updateRuntime(data.runtime);
    updateReleaseDate(data.release_date);
    updateGenre(data.genres);
    updateMovieVideo(id);
    //updatePoster(data.poster_path);
    updateMovieDescription(data.overview);
}

//boolean reset to see if you want to clear the screen
function showMovies(movies, reset) {
    if (reset) {
        movieGrid.innerHTML = "";
    }
    movies.forEach((movie) => {
        const {title, poster_path, vote_count, overview, id} = movie;
        //console.log(movie);
        //skip movies with no poster_path
        if (poster_path != null) {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML =  `
                <div id="movie-info">
                    <h2>${title}</h2>
                    <h4>Votes: ${vote_count}</h4>
                </div>
                <img src="${IMGURL + poster_path}" alt="${title}" />
                `
            //pass in anonymous function so that you can declare function outside
            movieCard.addEventListener('click', () => handleClick(id,overview))
            movieGrid.appendChild(movieCard);
        }
    });
}


function updatePoster(posterURL) {
    moviePoster.setAttribute("src",posterURL);
}
function updateRuntime(runtimeString) {
    movieRuntime.innerHTML = "Runtime: " + runtimeString;
}
function updateMovieDescription(descriptionString) {
    movieDescription.innerHTML = descriptionString;
}
//array of id and name
function updateGenre(genreArray) {
    var str = "Genres: ";
    genreArray.forEach((genre) => {
        str += genre.name + " ";
    });
    //console.log(str); 
    movieGenre.innerHTML = str;
}
function updateReleaseDate(release) {
    movieRelease.innerHTML = "Release Date: " + release;
}

// function getVideoID(movie_id) {
//     var videoID = URLSHORT+movie_id+`/videos?api_key=${API_KEY}`;
//     return videoID;
// }
async function updateMovieVideo(movieID){
    const response = await fetch(URLSHORT+movieID+`/videos?api_key=${API_KEY}`);
    const result = await response.json();
    var videoID = result.results[0].key;
    movieVideo.setAttribute("src",`https://www.youtube.com/embed/${videoID}`);
}


window.onload = function () {
    getMovies("");
}
