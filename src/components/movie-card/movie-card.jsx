import React from 'react';

export const MovieCard = ({ movieData, onClick }) => {
    return (
        <div onClick={() => onClick(movieData)}>
            <h3>{movieData.title}</h3>
        </div>
    );
};


