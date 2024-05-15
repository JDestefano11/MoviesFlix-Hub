import React from 'react';

export const MovieCard = ({ movieData, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movieData);
            }}
        >
            {movie.title}
        </div>
    );
};





