import axios from 'axios';

const KEY = 'ee56db8892f559717fc3072a85c6d9f5';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = { api_key: KEY };

export async function fetchTrending() {
  const response = await axios.get('trending/movie/day');
  //   console.log(response.data);
  return response.data.results;
}
export async function fetchSearchMovieByWord(query = 'film') {
  const response = await axios(
    `search/movie?query=${query}&include_adult=false&language=en-US&page=1`
  );
  //   console.log(response.data.results);
  return response.data.results;
}
export async function fetchMovieDetails(movie_id = '507089') {
  const response = await axios(`movie/${movie_id}?language=en-US`);
  //   console.log(response.data);
  return response.data;
}

export async function fetchMovieCast(movie_id = '507089') {
  const response = await axios(`movie/${movie_id}/credits?language=en-US`);
  //   console.log(response.data);
  return response.data.cast;
}
export async function fetchMovieReviews(movie_id = '507089') {
  const response = await axios(
    `movie/${movie_id}/reviews?language=en-US&page=1`
  );
  //   console.log(response.data);
  return response.data.results;
}
