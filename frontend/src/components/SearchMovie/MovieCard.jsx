import React from 'react';

const MovieCard = (movie) => {
    console.log(movie.movie.Poster)
  return (
    <div style={styles.card}>
      <img src={movie.movie.Poster} alt={movie.movie.Title} style={styles.poster} />
      <div style={styles.details}>
        <h2 style={styles.title}>{movie.movie.Title}</h2>
        <p style={styles.meta}>{movie.movie.Type} | {movie.movie.Year}</p>
        <a
          href={`https://www.imdb.com/title/${movie.movie.imdbID}`}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          View on IMDb
        </a>
      </div>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: '300px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
  },
  poster: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  details: {
    padding: '16px',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: 0,
  },
  meta: {
    color: '#555',
    margin: '8px 0',
  },
  link: {
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  }
};

export default MovieCard;
