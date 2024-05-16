export const MovieView = ({ movieData, onBackClick }) => {
    return (
        <div>
            <div>
                <h2>{movieData.title}</h2>
                <p><strong>Description:</strong> {movieData.description}</p>
                {movieData.genre && (
                    <div>
                        <p><strong>Genre:</strong> {movieData.genre.name}</p>
                        <p><strong>Genre Description:</strong> {movieData.genre.description}</p>
                    </div>
                )}
                {movieData.director && (
                    <div>
                        <p><strong>Director:</strong> {movieData.director.name}</p>
                        <p><strong>Director's Occupation:</strong> {movieData.director.occupation}</p>
                        <p><strong>Director's Birthdate:</strong> {movieData.director.birthdate}</p>
                        <p><strong>Director's Birthplace:</strong> {movieData.director.birthplace}</p>
                    </div>
                )}
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>

    );
}
