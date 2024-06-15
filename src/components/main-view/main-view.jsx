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
    const [showSignup, setShowSignup] = useState(!user); // Show SignupView if user is not logged in

    const handleLogin = (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        setShowSignup(false); // Hide SignupView after successful login
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setShowSignup(true); // Show SignupView after logout
    };

    const handleSignup = (signupData) => {

        console.log('Signup data:', signupData);

        alert('Signup successful!');
        setUser(signupData);
        setShowSignup(false);
    };

    useEffect(() => {
        if (!token) return;

        fetch("https://moviesflix-hub-fca46ebf9888.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [token]);

    return (
        <div>
            {!user ? (
                <>
                    <LoginView onLoggedIn={handleLogin} />
                    {showSignup && <SignupView onSignup={handleSignup} />}
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
                            {movies.length === 0 ? (
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
