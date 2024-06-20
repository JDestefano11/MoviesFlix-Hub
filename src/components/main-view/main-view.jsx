import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoadingMovies, setLoadingMovies] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const fetchMovies = async () => {
        setLoadingMovies(true);
        try {
            const response = await fetch('https://moviesflix-hub-fca46ebf9888.herokuapp.com/movies', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch movies');
            }
            const data = await response.json();
            setMovies(data);
            setLoadingMovies(false);
        } catch (error) {
            console.error('Error fetching movies:', error);
            setLoadingMovies(false);
            // Handle error (e.g., show error message)
        }
    };

    const handleLogin = async (userData, authToken) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        fetchMovies();
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setMovies([]); // Clear movies when logging out
        setSelectedMovie(null); // Reset selected movie when logging out
    };

    const handleMovieClick = (movieData) => {
        setSelectedMovie(movieData);
    };

    return (
        <div>
            {!user ? (
                <div>
                    <LoginView onLoggedIn={handleLogin} />
                    <SignupView onSignup={(userData, authToken) => handleLogin(userData, authToken)} />
                </div>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    {selectedMovie ? (
                        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                    ) : (
                        <div>
                            {isLoadingMovies ? (
                                <div>Loading...</div>
                            ) : movies.length === 0 ? (
                                <div>The movie list is empty</div>
                            ) : (
                                <div>
                                    {movies.map((movie) => (
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}
                                            onMovieClick={() => handleMovieClick(movie)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
