export const MovieView = ({ movie }) => {
    return (
        <div>
            <div key={movie.id}>
                <h2>{movie.title}</h2>
                <p><strong>Description:</strong> {movie.description}</p>
                <p><strong>Genre:</strong> {movie.genre.name}</p>
                <p><strong>Genre Description:</strong> {movie.genre.description}</p>
                <p><strong>Director:</strong> {movie.director.name}</p>
                <p><strong>Director's Occupation:</strong> {movie.director.occupation}</p>
                <p><strong>Director's Birthdate:</strong> {movie.director.birthdate}</p>
                <p><strong>Director's Birthplace:</strong> {movie.director.birthplace}</p>
            </div>
        </div>
    );
}