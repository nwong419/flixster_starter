const URLSHORT = "https://api.themoviedb.org/3/movie/";
const API_KEY = "e3bdfddfeebbac2a8f116ab1f25a51f1";
const IMGURL = "https://image.tmdb.org/t/p/w300";
const SEARCH = "https://api.themoviedb.org/3/search/movie?api_key="+`${API_KEY}`;

///get dom objects
const movieGrid = document.querySelector(".movies-grid");
const movieModal = document.querySelector(".movie-modal");
const movieVideo = document.getElementById("youtube");
const closeSpan = document.querySelector(".close");
const movieCard = document.querySelectorAll(".movie-card");
const searchBar = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchForm = document.querySelector(".search-bar");
const previousButton = document.getElementById("close-search-btn");
const moreButton = document.getElementById("load-more-movies-btn");
const movieRuntime = document.querySelector(".modal-runtime");
const movieRelease = document.querySelector(".modal-release-date");
const movieGenre = document.querySelector(".modal-genre");
const moviePoster = document.getElementById("backdrop");
const movieDescription = document.querySelector(".modal-description");

//Global variables
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
});

async function fetchData(URL) {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}

//should not reload whole page, only append
async function getMovies(searchTerm) {
    let URL = `${SEARCH}&query=${searchTerm}&page=${pageIndex}`;
    if (searchTerm == "") {
        URL = `${URLSHORT}now_playing?api_key=${API_KEY}&page=${pageIndex}`;
    }
    let data = await fetchData(URL);
    showMovies(data.results, resetBoolean);
}

function getMoreMovies(searchTerm) {
    pageIndex++;
    resetBoolean = false;
    getMovies(searchTerm);
}

//modal popup
async function handleClick(id) {
    movieModal.classList.remove("hidden");
    //api call to get more details on specific a movie based on id
    let URL = `${URLSHORT}${id}?api_key=${API_KEY}`;
    let data = await fetchData(URL);
    //populate modal information
    updateRuntime(data.runtime);
    updateReleaseDate(data.release_date);
    updateGenre(data.genres);
    updateMovieVideo(id);
    updateMovieDescription(data.overview);
}

function populateHTML(title, vote_average, poster_path) {
    return `
        <div id="movie-info">
            <h2 class="movie-title">${title}</h2>
            <h4 class="movie-votes">${vote_average}<i class="fa-solid fa-star"></i></h4>
        </div>
        <img class="movie-poster" src="${IMGURL}${poster_path}" alt="${title}" />
    `
}

//boolean reset to see if you want to clear the screen
function showMovies(movies, reset) {
    if (reset) {
        movieGrid.innerHTML = "";
    }
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, id} = movie;
        //skip movies with no poster_path
        if (poster_path != null) {
            const movieCard = document.createElement("div");
            //movie wrapper element
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = populateHTML(title,vote_average,poster_path);
            //pass in anonymous function so that you can declare function outside
            movieCard.addEventListener('click', () => handleClick(id))
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

//genre array of id and name
function updateGenre(genreArray) {
    var str = "Genres: ";
    genreArray.forEach((genre) => {
        str += genre.name + " ";
    });
    movieGenre.innerHTML = str;
}
function updateReleaseDate(release) {
    movieRelease.innerHTML = `Release Data: ${release}`
}

async function updateMovieVideo(movieID){
    let URL = `${URLSHORT}${movieID}/videos?api_key=${API_KEY}`;
    let data = await fetchData(URL);
    let videoID = data.results[0].key;
    movieVideo.setAttribute("src",`https://www.youtube.com/embed/${videoID}`);
}


window.onload = function () {
    getMovies("");
}
