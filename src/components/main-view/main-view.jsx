import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col } from 'react-bootstrap';

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
        <Row className="justify-content-center">
            {!user ? (
                <Col md={4}>
                    <LoginView onLoggedIn={handleLogin} />
                    <SignupView onSignup={(userData, authToken) => handleLogin(userData, authToken)} />
                </Col>
            ) : (
                <Col md={8}>
                    <div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    {selectedMovie ? (
                        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                    ) : (
                        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                            {isLoadingMovies ? (
                                <div>Loading...</div>
                            ) : movies.length === 0 ? (
                                <div>The movie list is empty</div>
                            ) : (
                                movies.map((movie) => (
                                    <Col key={movie.id}>
                                        <MovieCard
                                            movie={movie}
                                            onMovieClick={() => handleMovieClick(movie)}
                                        />
                                    </Col>
                                ))
                            )}
                        </Row>
                    )}
                </Col>
            )}
        </Row>
    );
};

