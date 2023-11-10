import Loader from 'components/Loader/Loader';
import React from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import { fetchMovieDetails } from 'services/TmbdApi';
import styles from './MovieDetails.module.css';

const MovieDetails = ({ id }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  //   const handleClick = () => navigate(location?.state?.from ?? '/');

  //   const handleClick = () => {
  //     navigate(-1);
  //   };
  const handleClick = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const MovieDetails = async () => {
      try {
        setIsLoading(true);
        const movie = await fetchMovieDetails(movieId);

        setMovie(movie);
      } catch (error) {
        setError('Something went wrong...');
      } finally {
        setIsLoading(false);
      }
    };
    MovieDetails();
  }, [movieId]);

  return (
    <>
      {error && <div>{error}</div>}
      <div className={styles.movie}>
        <button type="text" onClick={handleClick} className={styles.backButton}>
          Go back
        </button>
      </div>
      {isLoading && <Loader />}
      {movie && (
        <div className={styles.details}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title ?? movie.name}
          />
          <div className={styles.description}>
            <h2>{movie.title ?? movie.name}</h2>
            <p>User Score: {Math.round(movie.popularity)} % </p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            {movie.genres.map(({ id, name }) => (
              <p key={id}>{name}</p>
            ))}
          </div>
        </div>
      )}
      <div className={styles.description}>
        <h2>Additional Information</h2>
        <div className={styles.nav}>
          <NavLink
            to={`cast`}
            end
            className={`${styles.link} ${
              location.pathname.includes('cast') ? styles.active : ''
            }`}
            state={location.state}
          >
            <p>Cast</p>
          </NavLink>
          <NavLink
            to={`reviews`}
            end
            className={`${styles.link} ${
              location.pathname.includes('reviews') ? styles.active : ''
            }`}
            state={location.state}
          >
            <p>Reviews</p>
          </NavLink>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default MovieDetails;
