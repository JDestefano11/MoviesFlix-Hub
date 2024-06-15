export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <h2>{movie.Title}</h2>
                <p><strong>Description:</strong> {movie.Description}</p>
                {movie.Genre && (
                    <div>
                        <p><strong>Genre:</strong> {movie.Genre.Name}</p>
                        <p><strong>Genre Description:</strong> {movie.Genre.Description}</p>
                    </div>
                )}
                {movie.Director && (
                    <div>
                        <p><strong>Director:</strong> {movie.Director.Name}</p>
                        <p><strong>Director's Occupation:</strong> {movie.Director.Occupation}</p>
                        <p><strong>Director's Birthdate:</strong> {new Date(movie.Director.BirthDate).toLocaleDateString()}</p>
                        <p><strong>Director's Birthplace:</strong> {movie.Director.BirthPlace}</p>
                    </div>
                )}
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
}