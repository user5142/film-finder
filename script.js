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
            const jsonResponse = await response.json();
            const movieInfo = jsonResponse;
            return movieInfo;
        }
    } catch (error) {
        console.log(error);
    }
};

// Gets a list of movies from a random page between 1 and 500 and displays the info of a random movie from the random page
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