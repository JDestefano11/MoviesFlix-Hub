import React from 'react';
import { PropTypes } from "prop-types";

export const MovieCard = ({ movieData, onClick }) => {
    return (
        <div onClick={() => onClick(movieData)}>
            <h3>{movieData.title}</h3>
        </div>
    );
};

MovieCard.propTypes = {
    movieData: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

