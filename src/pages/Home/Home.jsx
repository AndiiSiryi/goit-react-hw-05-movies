import React, { useState, useEffect } from 'react';
import { fetchTrending } from 'services/TmbdApi';
import Loader from 'components/Loader/Loader';
import MovieCard from 'components/MovieCard/MovieCard';
import styles from './Home.module.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const movies = await fetchTrending();
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>{error}</div>}
      <div>
        <h2>Trending Movies</h2>
        <ul className={styles.movieList}>
          {Array.isArray(movies) &&
            movies?.map(movie => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                name={movie.name}
                posterPath={movie.poster_path}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
