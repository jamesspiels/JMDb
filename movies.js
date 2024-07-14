let searchUrl = "";
let movies = "";
let moviesExist = false;
let loaded = 0;
let filter ="";
let nothing = 0;



async function get(movies){

    const moviesData = await movies.clone().json();
    const movieList = moviesData.Search;
    const movieListEl = document.querySelector(".movies");
    
    if(movieList.length >= 10){
        movieList.pop()
    }


        if(filter){
            if(filter === "OLD__TO__NEW"){
                movieList.sort((a,b) => (a.Year - b.Year))
            }
            else if(filter === "NEW__TO__OLD"){
                movieList.sort((a,b) => (b.Year - a.Year))
            }
            return movieListEl.innerHTML = movieList.map(movie => movieHTML(movie)).join("");
                
        }

    movieListEl.innerHTML = movieList.map(movie => movieHTML(movie)).join("")
    return loaded === 0 || !moviesExist || !filter || (!moviesExist && !filter) ? loaded = 1: alert("An error has occured. Please try again.")
}

function showMovieDetails(id){
    localStorage.setItem("id", id)
    console.log(`this ran. id: ${id}`);
    localStorage.setItem("id", id)
    window.location.href = `${window.location.origin}/details.html`
    
}

function movieHTML(movie){
    console.log(movie.imdbID)
    return `<div class="movie">
                <figure class = "movie__img--wrapper">
                    <img src="${movie.Poster}" class="movie__img click" onclick = "showMovieDetails('${movie.imdbID}')">
                </figure>
                <div class="movie__title">${movie.Title} (${movie.Year})</div>
            </div>`
}

async function search(){
    searchVal = document.querySelector(".header__input").value
    movies = await fetch(`https://www.omdbapi.com/?apikey=f06dc987&s=alpha&type=movie`);

    if(!searchVal){
        moviesExist= false;
    }
    else{
        moviesExist = true;
        movies = await fetch(`https://www.omdbapi.com/?apikey=f06dc987&s=${searchVal}&type=movie`);
    }
    return get(movies);
}

async function filterMovies(event){
    filter = event.target.value;
    get(movies)
}

