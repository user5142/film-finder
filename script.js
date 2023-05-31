const playBtn = document.getElementById("playBtn");
const aboutlink = document.getElementById('aboutlink');

const getGenres = async () => {
    try {
        const response = await fetch('/.netlify/functions/genres');
        if (response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres;
            return genres;
        }
    } catch (error) {
        console.log(error);
    }
};

const getMovieInfo = async () => {
    const selectedGenre = getSelectedGenre();

    try {
        const response = await fetch(`/.netlify/functions/${selectedGenre}`);
        if (response.ok) {
            const movieInfo = await response.json();
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }
};

/*const getMovies = async () => {
    const selectedGenre = getSelectedGenre();

    try {
        const response = await fetch(`/.netlify/functions/${selectedGenre}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            console.log(movies);
            return movies;
        }
    } catch (error) {
        console.log(error);
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const movieInfo = await response.json();
            // console.log(movieInfo);
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }
};*/

// Gets a list of movies from a random page between 1 and 500 and displays the info of a random movie from the random page
const showRandomMovie = async () => {
    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo.childNodes.length > 0) {
        hideAboutSection();
        clearCurrentMovie();
        /* const movies = await getMovies();
        const randomMovie = getRandomMovie(movies);*/
        const movieInfo = await getMovieInfo();
        console.log(movieInfo);
        displayMovie(movieInfo);
    }
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
aboutlink.onclick = showAboutSection;