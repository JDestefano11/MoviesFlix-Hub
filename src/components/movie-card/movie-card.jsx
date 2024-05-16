import React from 'react';

export const MovieCard = ({ movieData, onClick }) => {
    console.log(movieData); // Debugging
    return (
        <div onClick={() => onClick(movieData)}>
            <h3>{movieData.title}</h3>
            <p>{movieData.description}</p>
        </div>
    );
};


