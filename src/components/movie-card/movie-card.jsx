export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div onClick={() => onMovieClick(movie)}>
            <h3>{movie.Title}</h3>
        </div>
    );
};