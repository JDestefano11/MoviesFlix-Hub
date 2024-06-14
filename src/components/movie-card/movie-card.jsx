

export const MovieCard = ({ movie, onClick }) => {
    console.log("Type of onClick:", typeof onClick);
    return (
        <div onClick={() => onClick(movie)}>
            <h3>{movie.Title}</h3>
        </div>
    );
};
