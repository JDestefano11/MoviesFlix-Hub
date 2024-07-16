import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { SimilarMoviesView } from "../similar-movies/similar-movies";
import { useEffect } from "react";

export const MovieView = ({ movies, user, token }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((movie) => movie._id === movieId);

  if (!movie) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    // Get existing recently viewed movies from local storage
    const recentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    // Add current movie to the list if it's not already there
    if (!recentlyViewed.find((m) => m._id === movie._id)) {
      const updatedRecentlyViewed = [movie, ...recentlyViewed].slice(0, 5); // Keep only the 5 most recent
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(updatedRecentlyViewed)
      );
    }
  }, [movie]);

  return (
    <div className="movie-view">
      <style>
        {`
          .movie-view {
            color: #ffffff;
          }
          .movie-view h2 {
            color: #ffffff;
          }
          .movie-view p {
            color: #ffffff;
          }
          .movie-view strong {
            color: #e2b400;
          }
        `}
      </style>
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={5}
            lg={5}
            className="text-center text-md-start mb-4 mb-md-0"
          >
            <img
              src={movie.ImageUrl}
              alt={movie.Title}
              className="movie-poster img-fluid"
              style={{
                maxHeight: "600px",
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Col>
          <Col xs={12} md={7} lg={7}>
            <div className="movie-details">
              <h2 className="mb-3">{movie.Title}</h2>
              <p>
                <strong>Description:</strong> {movie.Description}
              </p>
              {movie.Genre && (
                <>
                  <p>
                    <strong>Genre:</strong> {movie.Genre.Name}
                  </p>
                  <p>
                    <strong>Genre Description:</strong>{" "}
                    {movie.Genre.Description}
                  </p>
                </>
              )}
              {movie.Director && (
                <>
                  <p>
                    <strong>Director:</strong> {movie.Director.Name}
                  </p>
                  <p>
                    <strong>Director's Occupation:</strong>{" "}
                    {movie.Director.Occupation}
                  </p>
                  <p>
                    <strong>Director's Birthdate:</strong>{" "}
                    {movie.Director.BirthDate}
                  </p>
                  <p>
                    <strong>Director's Birthplace:</strong>{" "}
                    {movie.Director.BirthPlace}
                  </p>
                </>
              )}
              <Button
                variant="primary"
                className="back-button mt-4"
                onClick={() => navigate("/movies")}
                style={{
                  backgroundColor: "#FFD700",
                  color: "#1A1A1A",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  borderRadius: "5rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                  width: "100%",
                  maxWidth: "13rem",
                  height: "3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#E2B400";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#FFD700";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                }}
              >
                Back to Movies
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 pt-5">
          <Col>
            <SimilarMoviesView
              currentMovie={movie}
              movies={movies}
              username={user?.username}
              authToken={token}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
