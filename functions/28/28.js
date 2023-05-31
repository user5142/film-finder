// Genre id 28 = action
const axios = require('axios')

const tmdbBaseUrl = "https://api.themoviedb.org/3";
const tmdbKey = process.env.tmdbKey

// Returns an array of action movies from a random page between 1 and 500
const handler = async (event) => {
    const randomPage = Math.floor(Math.random() * 500);
    const discoverMovieEndpoint = "/discover/movie";
    const requestParams = `?api_key=${tmdbKey}&with_genres=28&page=${randomPage}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
        const { data } = await axios.get(urlToFetch)

        const randomMovieId = Math.floor(Math.random() * data.results.length);
        const movieInfoUrl = `${tmdbBaseUrl}/movie/${randomMovieId}${requestParams}`;

        const { data: movieInfo } = await axios.get(movieInfoUrl);  

        return {
            statusCode: 200,
            body: JSON.stringify({
                data,
                movieInfo,
            })
        }

    } catch (error) {
        const { status, statusText, headers, data } = error.response
        return {
            statusCode: status,
            body: JSON.stringify({ status, statusText, headers, data })
        }
    }

}

module.exports = { handler }