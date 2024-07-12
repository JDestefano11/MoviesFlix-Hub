import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col, Container } from "react-bootstrap";
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

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
      <Container>
        <Row className="justify-content-md-center">
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
            {/* Route for MovieView */}
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
                  movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    movies.map((movie) => (
                      <Col key={movie._id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard
                          key={movie._id}
                          movie={movie}
                          username={user.username}
                          authToken={token}
                          token={token}
                          favorites={favorites}
                          updateFavorites={updateFavorites}
                        />
                      </Col>
                    ))
                  )
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                user ? (
                  <Col>
                    <Row>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        onDelete={handleLoggedOut}
                        movies={movies}
                        favorites={favorites}
                        updateFavorites={updateFavorites}
                      />
                    </Row>
                  </Col>
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
        </Row>
      </Container>
    </BrowserRouter>
  );
};
