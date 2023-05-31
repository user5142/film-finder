const playBtn = document.getElementById("playBtn");
const aboutlink = document.getElementById('aboutlink');

// Retrieves an array of movie genres from TMDB using a serverless Netlify function
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

// Retrieves the movieInfo object of a randomly selected movie from the chosen genre using a serverless Netlify function
const getMovieInfo = async () => {
    const selectedGenre = getSelectedGenre();

    try {
        const response = await fetch(`/.netlify/functions/${selectedGenre}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }
};

// Gets a list of movies from a random page between 1 and 500 of the selected genre and displays the info of a random movie from the random page
const showRandomMovie = async () => {
    const movieInfo = document.getElementById("movieInfo");
    if (movieInfo.childNodes.length > 0) {
        hideAboutSection();
        clearCurrentMovie();
    }
    const info = await getMovieInfo();
    displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
aboutlink.onclick = showAboutSection;