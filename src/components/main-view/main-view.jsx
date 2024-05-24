import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view'


export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://movies-flixhub-b3cf1708f9a6.herokuapp.com/movies")
            .then(response => response.json())
            .then((data) => {
                const moviesFromApi = data.map((doc) => {
                    return {
                        id: doc.key,
                        title: doc.title,
                        description: doc.description,
                        genre: {
                            name: doc.genre.name,
                            description: doc.genre.description
                        },
                        director: {
                            name: doc.director.name,
                            occupation: doc.director.occupation,
                            birthdate: doc.director.birthdate,
                            birthplace: doc.director.birthplace
                        }
                    };
                });
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const handleMovieClick = (movieData) => {
        setSelectedMovie(movieData);
    }; 8

    console.log("Movies:", movies); // Log the movies array

    if (selectedMovie) {
        return (<MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie
            (null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The movie list is empty</div>;
    }

    return (
        <div>
            {movies.map((movieData) => (
                <MovieCard
                    key={movieData.id}
                    movieData={movieData}
                    onClick={handleMovieClick}
                />
            ))}
        </div>
    );
};
