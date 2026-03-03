let movies = [];
const apiKey = "e687b801"; 
const resultsEl = document.querySelector('.search-results');
const savedTitle = localStorage.getItem("Title");

// for dark theme toggle
document.addEventListener("DOMContentLoaded", () => { 
    let savedTheme = localStorage.getItem("theme"); 
    if (savedTheme === "dark") { 
        document.body.classList.add("dark-theme"); 
    }
});

async function onSearchChange(event) {
    const title = event.target.value.trim();
    if (title.length > 0) {
        renderMovies(title);
    }
}

async function renderMovies(title) { 
    const response = await fetch(`https://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
    const data = await response.json();

    if (!data || !data.Search) {
        resultsEl.innerHTML = "<p>NO MOVIE FOUND.</p>";
        return;
    }
    movies = data.Search;
    // resultsEl.innerHTML = movieHTML(data);
    resultsEl.innerHTML = data.Search.map(movie => movieHTML(movie)).join("");
}

async function filterMovies(event) {
    const filter = event.target.value;

    resultsEl.classList += ' movies__loading'

    if (!movies || movies.length === 0) {
        return;
    }
    
    resultsEl.classList.remove('movies__loading')

    if (filter === "A_TO_Z") {
        // movies.sort((a, b) => a.Title-b.Title);
        movies.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === "Z_TO_A") {
        // movies.sort((a, b) => b.Title-a.Title);
        movies.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (filter === "ASCENDING_YEAR") {
        // movies.sort((a, b) => a.Year - b.Year);
        movies.sort((a, b) => Number(a.Year) - Number(b.Year));
    } else if(filter === "DESCENDING_YEAR"){
        // movies.sort((a,b) => b.Year - a.Year);
        movies.sort((a,b) => Number(b.Year) - Number(a.Year));
    }

    resultsEl.innerHTML = movies.map(movie => movieHTML(movie)).join("");
}

// function movieHTML(movie){
//     return `
//         <div class="movie"  onclick="showSearchMovies('${movie.Title}')">
//             <img class="movie__poster" src="${movie.Poster}" />
//             <div class="movie__title">${movie.Title}</div>
//             <div class="movie__year">${movie.Year}</div>
//         </div>
//     `;
// }

function movieHTML(movie) {
    return `
        <div class="movie" onclick="showMovieDetails('${movie.imdbID}')">
            <img class="movie__poster" src="${movie.Poster}" />
            <div class="movie__title">${movie.Title}</div>
            <div class="movie__year">${movie.Year}</div>
        </div>
    `;
}

function movieModal(movie){
    return `
    <div class="modal__movie" onclick="showMovieDetails('${movie.imdbID}')">
      <div class="movie__poster">${movie.Poster}</div>
      
      <div class="modal__description">
        <h3 class="modal__title">${movie.Title}</h3>
        <h4 class="modal__year">${movie.Year}</h4>
        <h4 class="modal__rated">${movie.Rated}</h4>
        <h4 class="modal__released">${movie.Released}</h4>
        <h4 class="modal__runtime">${movie.Runtime}</h4>
        <h4 class="modal__genre">${movie.genre}</h4>
        <h4 class="modal__directors">${movie.Director}</h4>
        <h4 class="modal__writers">${movie.Writers}</h4>
        <h4 class="modal__actors">${movie.Actors}</h4>
        <p class="modal__plot">${movie.Plot}</p>
      </div>
    </div>     
    `;
}

async function showMovieDetails(id) {
    // 1. fetching full movie data using IMDb ID
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
    const movieData = await response.json();
    const poster = movieData.Poster !== "N/A" ? movieData.Poster : "https://via.placeholder.com";
    document.querySelector(".modal__poster__left").innerHTML = `<img src="${poster}" />`;

    // 2. mapping data to existing modal in movie.html
    document.querySelector(".modal__poster__left").innerHTML = `<img src="${movieData.Poster}" />`;
    document.querySelector(".modal__title").innerHTML = movieData.Title;
    document.querySelector(".modal__year").innerHTML = `Year: ${movieData.Year}`;
    document.querySelector(".modal__rated").innerHTML = `Rated: ${movieData.Rated}`;
    document.querySelector(".modal__release").innerHTML = `Released: ${movieData.Released}`;
    document.querySelector(".modal__runtime").innerHTML = `Runtime: ${movieData.Runtime}`;
    document.querySelector(".modal__genre").innerHTML = `Genre: ${movieData.Genre}`;
    document.querySelector(".modal__directors").innerHTML = `Director: ${movieData.Director}`;
    document.querySelector(".modal__writers").innerHTML = `Writers: ${movieData.Writer}`;
    document.querySelector(".modal__actors").innerHTML = `Actors: ${movieData.Actors}`;
    document.querySelector(".modal__plot").innerHTML = movieData.Plot;

    // 3. toggle visibility 
    const movieModal = document.querySelector(".modal__movie");
    movieModal.style.display = "flex"; 
    // movieModal.classList.add("modal--open"); 
    // document.body.classList.add("modal--open");
}

function closeMovieModal() {
    document.querySelector(".modal__movie").style.display = "none";
}

// if(savedTitle) {
//     renderMovies(savedTitle); // should load title from localStorage
// }

// function filterMovies(event) {
//   renderMovies(event.target.value);
// }

setTimeout(() => {
  renderMovies(savedTitle);
}, 0);
