import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Jurassic Park",
            description: "An adventurous theme park featuring cloned dinosaurs.",
            genre: {
                name: "Adventure",
                description: "Adventure films are exciting stories, with new experiences or exotic locales, where the protagonist faces physical, mental, or emotional challenges."
            },
            director: {
                name: "Steven Spielberg",
                occupation: "American filmmaker",
                birthdate: "1946-12-18",
                birthplace: "Cincinnati, Ohio, USA"
            }
        },
        {
            id: 2,
            title: "The Dark Night",
            description: "Batman battles against the Joker to save Gotham City",
            genre: {
                name: "Action",
                description: "Action films usually feature high-energy, fast-paced sequences with physical feats, fights, chases, and explosions.",
            },
            director: {
                name: "Christopher Nolan",
                occupation: "British-American filmmaker",
                birthdate: "1970-07-30",
                birthplace: "London, England, UK"
            }
        },
        {
            id: 3,
            title: "Schindler\'s List",
            description: "A powerful story about a German businessman who saved Jewish refugees during the Holocaust",
            genre: {
                name: "Drama",
                description: "Drama films are narrative works that present realistic characters and settings, focusing on emotional themes.",
                director: {
                    name: "Steven Spielberg",
                    occupation: "American filmmaker",
                    birthdate: "1946-12-18",
                    birthplace: "Cincinnati, Ohio, USA"
                }
            },
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return <MovieView movieData={movie} />
    }

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