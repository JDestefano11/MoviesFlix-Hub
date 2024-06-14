import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onClick }) => {
    console.log("Type of onClick:", typeof onClick);
    return (
        <div onClick={() => onClick(movie)}>
            <h3>{movie.Title}</h3>
        </div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
