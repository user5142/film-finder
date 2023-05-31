// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement('option');
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Hide About section
const hideAboutSection = () => {
    const aboutSection = document.getElementById('about');
    aboutSection.style.display = 'none';
}

// Show About section
const showAboutSection = () => {
    const aboutSection = document.getElementById('about');
    clearCurrentMovie();
    aboutSection.style.display = 'flex';
}

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');

    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title, date) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title + ` (${date.substring(0, 4)})`;

    return titleHeader;
};

// Create HTML for movie tagline
const createMovieTagline = (tagline) => {
    const taglineParagraph = document.createElement('p');
    taglineParagraph.setAttribute('id', 'movieTagline');
    taglineParagraph.innerHTML = tagline;

    return taglineParagraph;
}

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;

    return overviewParagraph;
};

// Create HTML for movie stats
const createMovieRuntime = (runtime) => {
    const runtimeText = document.createElement('p');
    runtimeText.setAttribute('id', 'movieRuntime');
    runtimeText.innerHTML = `<strong>Runtime:</strong> ${runtime} minutes`;

    return runtimeText;
}

// Create HTML for movie budget
const createMovieBudget = (budget) => {
    const budgetText = document.createElement('p');
    budgetText.setAttribute('id', 'movieBudget');
    const formatted = budget.toLocaleString('en-US')
    budgetText.innerHTML = `<strong>Budget:</strong> $${formatted}`;

    return budgetText;
}

// Create HTML for movie revenue
const createMovieRevenue = (revenue) => {
    const revenueText = document.createElement('p');
    revenueText.setAttribute('id', 'movieRevenue');
    const formatted = revenue.toLocaleString('en-US')
    revenueText.innerHTML = `<strong>Revenue:</strong> $${formatted}`;

    return revenueText;
}

// Returns a random movie from the randomly selected page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title, movieInfo.release_date);
    const taglineText = createMovieTagline(movieInfo.tagline);
    const overviewText = createMovieOverview(movieInfo.overview);
    const runtimeText = createMovieRuntime(movieInfo.runtime);
    const budgetText = createMovieBudget(movieInfo.budget);
    const revenueText = createMovieRevenue(movieInfo.revenue)

    // Append poster, title, tagline and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    if (movieInfo.tagline != "") {
        movieTextDiv.appendChild(taglineText);
    }
    movieTextDiv.appendChild(overviewText);
    if (movieInfo.runtime != '0') {
        movieTextDiv.appendChild(runtimeText);
    }
    if (movieInfo.budget != '0' && movieInfo.revenue != '0') {
        movieTextDiv.appendChild(budgetText);
        movieTextDiv.appendChild(revenueText);
    }
};