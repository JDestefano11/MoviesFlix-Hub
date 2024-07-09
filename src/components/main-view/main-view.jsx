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
  const [isLoadingMovies, setLoadingMovies] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
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
    // Navigate to the movies list after successful login
    window.location.href = "/movies";
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setMovies([]);
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
  };

  const handleAddFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }
      // Optionally update local state or refetch favorites
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
      // Optionally update local state or refetch favorites
    } catch (error) {
      console.error("Error removing from favorites:", error);
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
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
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
                onUserUpdate={handleUserUpdate}
                onUserDeregister={handleUserDeregister}
              />
            }
          />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
