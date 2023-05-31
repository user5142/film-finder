const axios = require('axios')

const tmdbBaseUrl = "https://api.themoviedb.org/3";
const tmdbKey = process.env.tmdbKey

const handler = async (event) => {
    const randomPage = Math.floor(Math.random() * 500);
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = "/discover/movie";
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
        const { data } = await axios.get(urlToFetch);

        return {
            statusCode: 200,
            body: JSON.stringify(data)
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