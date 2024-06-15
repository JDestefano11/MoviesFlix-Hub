import React from 'react';
import { PropTypes } from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div onClick={() => onMovieClick(movie)} style={{ cursor: 'pointer', marginBottom: '20px' }}>
            {movie.ImageUrl && <img src={movie.ImageUrl} alt={movie.Title} style={{ maxWidth: '10%', height: 'auto', marginBottom: '10px' }} />}
            <h3>{movie.Title}</h3>
        </div>
    );
};


MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

