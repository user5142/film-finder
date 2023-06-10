// Genre id 10752 = War
const axios = require('axios')

const tmdbBaseUrl = "https://api.themoviedb.org/3";
const tmdbKey = process.env.tmdbKey

// Returns an array of action movies from a random page between 1 and 500
const handler = async (event) => {
    let success = false;

    while (!success) {
        const randomPage = Math.floor(Math.random() * 500);
        const discoverMovieEndpoint = "/discover/movie";
        const requestParams = `?api_key=${tmdbKey}&with_genres=10752&page=${randomPage}`;
        const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

        try {
            const { data } = await axios.get(urlToFetch);

            const randomMovieIndex = Math.floor(Math.random() * data.results.length);
            const randomMovieId = data.results[randomMovieIndex].id;
            const movieInfoUrl = `${tmdbBaseUrl}/movie/${randomMovieId}${requestParams}`;

            const { data: movieInfo } = await axios.get(movieInfoUrl);

            success = true;

            return {
                statusCode: 200,
                body: JSON.stringify({ movieInfo })
            }

        } catch (error) {
            if (error.response) {
                const { status, statusText } = error.response;
                console.error(`Error fetching random movie: ${status} - ${statusText}`);
            } else {
                console.error("An error occurred while fetching random movie. No response received.");
            }
        }
    }
}

module.exports = { handler }