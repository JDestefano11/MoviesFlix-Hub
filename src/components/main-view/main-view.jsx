import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
    const [movies, setMovies] = useState([
        { id: 1, title: "Jurassic Park" },
        { id: 2, title: "The Dark Night" },
        { id: 3, title: "Schindler/'s List" },
        { id: 4, title: "Inception" },
        { id: 5, title: "The Shawshank Redemption" },
        { id: 6, title: "Forest Gump" },
        { id: 7, title: "The Godfather" },
        { id: 8, title: "The Matrix" },
        { id: 9, title: "Gladiator" },
        { id: 10, title: "Pulp Fiction" }
    ]);

    if (movies.length === 0) {
        return <div>The movie list is empty</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movieData={movie} />
            ))}
        </div>
    );
};

