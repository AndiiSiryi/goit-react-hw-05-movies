import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from 'components/MovieCard/MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movies, prevLocation }) => {
  return (
    <ul className={styles.movieList}>
      {movies?.map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          name={movie.name}
          posterPath={movie.poster_path}
          prevLocation={prevLocation}
        />
      ))}
    </ul>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  prevLocation: PropTypes.object,
};

export default MovieList;
