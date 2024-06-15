import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';


export const MainView = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
    const [isLoadingMovies, setLoadingMovies] = useState(false);


    useEffect(() => {
        // Check if user is already logged in
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogin = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        setShowSignup(false); // Hide SignupView after successful login
        fetchMovies(authToken); // Fetch movies after successful login
    };

    useEffect(() => {
        fetch("https://movies-flixhub-b3cf1708f9a6.herokuapp.com/movies")
            .then(response => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => ({
                    id: movie._id,
                    title: movie.Title,
                    description: movie.Description,
                    genre: {
                        name: movie.Genre.Name,
                        description: movie.Genre.Description
                    },
                    director: {
                        name: movie.Director.Name,
                        occupation: movie.Director.Occupation,
                        birthdate: movie.Director.BirthDate,
                        birthplace: movie.Director.BirthPlace,
                        bio: movie.Director.Bio
                    }
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const handleMovieClick = (movieData) => {
        setSelectedMovie(movieData);
    };


    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setShowSignup(true); // Show SignupView after logout
    };

    const handleSignup = (signupData, authToken) => {
        alert('Signup successful!');
        setUser(signupData);
        setShowSignup(false);
        fetchMovies(authToken); // Fetch movies after successful signup
    };

    const fetchMovies = (authToken) => {
        setLoadingMovies(true); // Set loading state
        fetch("https://moviesflix-hub-fca46ebf9888.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${authToken}` },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
                setLoadingMovies(false); // Clear loading state
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoadingMovies(false); // Clear loading state on error
            });
    };

    return (
        <div>
            {!user ? (
                <>
                    <LoginView onLoggedIn={handleLogin} />
                    <SignupView onSignup={(userData, authToken) => handleSignup(userData, authToken)} />
                </>
            ) : (
                <div>
                    <button onClick={handleLogout}>Logout</button>
                    {selectedMovie ? (
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={() => setSelectedMovie(null)}
                        />
                    ) : (
                        <div>
                            {isLoadingMovies ? (
                                <div>Loading...</div>
                            ) : movies.length === 0 ? (
                                <div>The movie list is empty</div>
                            ) : (
                                movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        onMovieClick={(movie) => setSelectedMovie(movie)}
                                    />
                                ))
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};