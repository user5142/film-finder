const axios = require('axios')

const handler = async (event) => {
  const tmdbBaseUrl = "https://api.themoviedb.org/3";
  const discoverMovieEndpoint = "/discover/movie";
  const tmdbKey = process.env.tmdbKey
  const selectedGenre = 'drama'
  const randomPage = '212'
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    const { data } = await axios.get(urlToFetch)

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
