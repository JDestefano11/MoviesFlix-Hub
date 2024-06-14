import React from 'react';

export const MovieCard = ({ movie, onClick }) => {
    return (
        <div onClick={() => onClick(movie)}>
            <h3>{movie.Title}</h3>
        </div>
    );
};

