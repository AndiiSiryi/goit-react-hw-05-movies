// MovieCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './MovieCard.module.css';

function MovieCard({ id, title, name, posterPath, prevLocation }) {
  return (
    <li className={styles.movieItem}>
      <Link
        to={{
          pathname: `/movies/${id}`,
          state: { from: prevLocation },
        }}
        className={styles.movieLink}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
          alt={title || name}
          className={styles.movieImage}
        />
        <p className={styles.movieTitle}>{title || name}</p>
      </Link>
    </li>
  );
}

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  name: PropTypes.string,
  posterPath: PropTypes.string,
};

export default MovieCard;
