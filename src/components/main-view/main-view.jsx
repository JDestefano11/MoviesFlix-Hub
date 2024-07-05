import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Spinner, Alert } from "react-bootstrap";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoadingMovies, setLoadingMovies] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
            if (storedFavorites) {
                setFavorites(storedFavorites);
            }
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchMovies();
        }
    }, [user]);

    const fetchMovies = async () => {
        setLoadingMovies(true);
        setError(null);
        try {
            const response = await fetch(
                "https://moviesflix-hub-fca46ebf9888.herokuapp.com/movies",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch movies");
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Error fetching movies:", error);
            setError("Failed to load movies. Please try again later.");
        } finally {
            setLoadingMovies(false);
        }
    };

    const handleLogin = (userData, authToken) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authToken);
        fetchMovies();
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"));
        if (storedFavorites) {
            setFavorites(storedFavorites);
        }
        // Navigate to the movies list after successful login
        window.location.href = "/movies";
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setMovies([]);
        setFavorites([]);
        localStorage.removeItem("favorites");
    };

    const handleUserUpdate = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    const handleUserDeregister = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setMovies([]);
        setFavorites([]);
        localStorage.removeItem("favorites");
    };

    const handleAddToFavorites = (movie, addToFavorites) => {
        if (addToFavorites) {
            const updatedFavorites = [...favorites, movie];
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } else {
            const updatedFavorites = favorites.filter((fav) => fav._id !== movie._id);
            setFavorites(updatedFavorites);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        }
    };

    const renderMovieList = () => {
        if (isLoadingMovies) {
            return <Spinner animation="border" />;
        }
        if (error) {
            return <Alert variant="danger">{error}</Alert>;
        }
        if (movies.length === 0) {
            return <div>The movie list is empty</div>;
        }
        return movies.map((movie) => (
            <MovieCard
                key={movie._id}
                movie={movie}
                onAddToFavorites={handleAddToFavorites}
            />
        ));
    };

    return (
        <Router>
            <NavigationBar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<LoginView onLoggedIn={handleLogin} />} />
                <Route path="/signup" element={<SignupView onSignup={handleLogin} />} />
                {user && (
                    <Route
                        path="/movies"
                        element={
                            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                                {renderMovieList()}
                            </Row>
                        }
                    />
                )}
                {user && (
                    <Route
                        path="/movies/:title"
                        element={<MovieView movies={movies} />}
                    />
                )}
                {user && (
                    <Route
                        path="/profile"
                        element={
                            <ProfileView
                                user={user}
                                movies={movies}
                                favorites={favorites}
                                onUserUpdate={handleUserUpdate}
                                onUserDeregister={handleUserDeregister}
                                onAddToFavorites={handleAddToFavorites}
                            />
                        }
                    />
                )}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};