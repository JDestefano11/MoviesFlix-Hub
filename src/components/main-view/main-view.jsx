import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col } from 'react-bootstrap';

export const MainView = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showSignup, setShowSignup] = useState(false);
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
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 401) {
                    await refreshToken();
                    fetchMovies();
                } else {
                    throw new Error('Failed to fetch movies');
                }
            } else {
                const data = await response.json();
                setMovies(data);
                setLoadingMovies(false);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
            setLoadingMovies(false);
        }
    };

    const handleLogin = async (userData, authToken) => {
        setUser(userData);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', authToken);
        setShowSignup(false);
        fetchMovies();
    };

    const handleLogout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setShowSignup(true);
    };

    const handleMovieClick = (movieData) => {
        setSelectedMovie(movieData);
    };

    return (
        <Row className="justify-content-md-center">
            <div>
                {!user ? (
                    <>
                        <LoginView onLoggedIn={handleLogin} />
                        <SignupView onSignup={(userData, authToken) => handleLogin(userData, authToken)} />
                    </>
                ) : (
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                        {selectedMovie ? (
                            <Col md={8} style={{ border: "1px solid black" }}>
                                <MovieView
                                    movie={selectedMovie}
                                    onBackClick={() => setSelectedMovie(null)}
                                />
                            </Col>
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
        </Row>
    );
};
