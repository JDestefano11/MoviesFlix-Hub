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
import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
  getFavoritesFromLocalStorage,
  setFavoritesInLocalStorage,
} from "../utilis/localstorage";

const MainView = () => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage());
  const [isLoadingMovies, setLoadingMovies] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    if (user) {
      fetchMovies();
    }
  }, [user]);

  useEffect(() => {
    // Example of setting username and authToken from localStorage or other source
    const storedUsername = localStorage.getItem("username");
    const storedAuthToken = localStorage.getItem("authToken");
    if (storedUsername && storedAuthToken) {
      setUsername(storedUsername);
      setAuthToken(storedAuthToken);
    }
  }, []);

  const fetchMovies = async () => {
    setLoadingMovies(true);
    setError(null);
    try {
      const response = await fetch(
        "https://moviesflix-hub-fca46ebf9888.herokuapp.com/movies",
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
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
    localStorage.setItem("user", JSON.stringify(userData)); // Store user as JSON string
    localStorage.setItem("token", authToken);
    setUsername(userData.username); // Assuming username is part of userData
    setAuthToken(authToken);
    fetchMovies();
    setFavorites(getFavoritesFromLocalStorage());
  };

  const handleLogout = () => {
    setUser(null);
    setUsername("");
    setAuthToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMovies([]);
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Store user as JSON string
    setUsername(updatedUser.username); // Assuming username is part of updatedUser
  };

  const handleUserDeregister = () => {
    setUser(null);
    setUsername("");
    setAuthToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMovies([]);
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  const handleAddToFavorites = (movie, addToFavorites) => {
    let updatedFavorites;
    if (addToFavorites) {
      updatedFavorites = [...favorites, movie];
    } else {
      updatedFavorites = favorites.filter((fav) => fav._id !== movie._id);
    }
    setFavorites(updatedFavorites);
    setFavoritesInLocalStorage(updatedFavorites);
  };

  const handleRemoveFromFavorites = (movieId) => {
    let updatedFavorites = favorites.filter((fav) => fav._id !== movieId);
    setFavorites(updatedFavorites);
    setFavoritesInLocalStorage(updatedFavorites);
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
        onAddFavorite={() => handleAddToFavorites(movie, true)}
        onRemoveFavorite={() => handleRemoveFromFavorites(movie._id)}
      />
    ));
  };

  return (
    <Router>
      <NavigationBar user={user} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/movies" />
            ) : (
              <LoginView onLoggedIn={handleLogin} />
            )
          }
        />
        <Route path="/signup" element={<SignupView onSignup={handleLogin} />} />
        <Route
          path="/movies"
          element={
            user ? (
              <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                {renderMovieList()}
              </Row>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/movies/:title"
          element={user ? <MovieView movies={movies} /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView
                user={user}
                movies={movies}
                favorites={favorites}
                onUserUpdate={handleUserUpdate}
                onUserDeregister={handleUserDeregister}
                onAddToFavorites={handleAddToFavorites}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
