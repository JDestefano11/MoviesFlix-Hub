import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MovieBoard } from "../movie-board/movie-board";
import { GenreSection } from "../genre-section/genre-section";
import { RecentlyViewedMovies } from "../recently-viewed/recently-viewed";

import { Row, Col, Container, modal } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(() => {
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return null;
    }
  });
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [movieOfTheDay, setMovieOfTheDay] = useState(null);
  const [showSimilarModal, setShowSimilarModal] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handleSearch = (searchTerm) => {
    const filtered = movies.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://moviesflix-hub-fca46ebf9888.herokuapp.com/movies",
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
      }
    };

    fetchMovies();
  }, [token]);

  useEffect(() => {
    const fetchMovieOfTheDay = async () => {
      try {
        const response = await fetch(
          "https://moviesflix-hub-fca46ebf9888.herokuapp.com/movie-of-the-day",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMovieOfTheDay(data);
        }
      } catch (error) {
        console.error("Error fetching Movie of the Day:", error);
      }
    };

    if (token) {
      fetchMovieOfTheDay();
    }
  }, [token]);

  const groupMoviesByGenre = (movies) => {
    return movies.reduce((acc, movie) => {
      const genreName = movie.Genre.Name;
      if (!acc[genreName]) {
        acc[genreName] = [];
      }
      acc[genreName].push(movie);
      return acc;
    }, {});
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={handleLoggedOut}
        onSearch={handleSearch}
      />
      <Container>
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupView />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginView onLoggedIn={handleLoggedIn} />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              user ? (
                <MovieView movies={movies} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/movies"
            element={
              user ? (
                <>
                  {movieOfTheDay && <MovieBoard movie={movieOfTheDay} />}
                  <RecentlyViewedMovies
                    token={token}
                    favorites={favorites}
                    updateFavorites={updateFavorites}
                  />
                  <div className="movie-list-container">
                    {Object.entries(
                      groupMoviesByGenre(
                        filteredMovies.length > 0 ? filteredMovies : movies
                      )
                    ).map(([genreName, genreMovies]) => (
                      <GenreSection
                        key={genreName}
                        genreName={genreName}
                        movies={genreMovies}
                        username={user.username}
                        token={token}
                        favorites={favorites}
                        updateFavorites={updateFavorites}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/profile"
            element={
              user ? (
                <ProfileView
                  user={user}
                  token={token}
                  setUser={setUser}
                  onDelete={handleLoggedOut}
                  movies={movies}
                  favorites={favorites}
                  updateFavorites={updateFavorites}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={<Navigate to={user ? "/movies" : "/login"} replace />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};
