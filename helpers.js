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
    if (date != '') {
        titleHeader.innerHTML = title + ` (${date.substring(0, 4)})`;
    } else {
        titleHeader.innerHTML = title;
    }

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

// Create HTML for movie runtime
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

// Uses the DOM to create HTML to display the movie
const displayMovie = (info) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(info.movieInfo.poster_path);
    const titleHeader = createMovieTitle(info.movieInfo.title, info.movieInfo.release_date);
    const taglineText = createMovieTagline(info.movieInfo.tagline);
    const overviewText = createMovieOverview(info.movieInfo.overview);
    const runtimeText = createMovieRuntime(info.movieInfo.runtime);
    const budgetText = createMovieBudget(info.movieInfo.budget);
    const revenueText = createMovieRevenue(info.movieInfo.revenue)

    // Append poster, title, tagline and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    if (info.movieInfo.tagline != "") {
        movieTextDiv.appendChild(taglineText);
    }
    movieTextDiv.appendChild(overviewText);
    if (info.movieInfo.runtime != '0') {
        movieTextDiv.appendChild(runtimeText);
    }
    if (info.movieInfo.budget != '0' && info.movieInfo.revenue != '0') {
        movieTextDiv.appendChild(budgetText);
        movieTextDiv.appendChild(revenueText);
    }
};