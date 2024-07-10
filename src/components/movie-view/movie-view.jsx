import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((movie) => movie._id === movieId);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-view">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <img
              src={movie.ImageUrl}
              alt={movie.Title}
              className="movie-poster"
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <div className="movie-details">
              <h2>{movie.Title}</h2>
              <p>
                <strong>Description:</strong> {movie.Description}
              </p>
              {movie.Genre && (
                <div>
                  <p>
                    <strong>Genre:</strong> {movie.Genre.Name}
                  </p>
                  <p>
                    <strong>Genre Description:</strong>{" "}
                    {movie.Genre.Description}
                  </p>
                </div>
              )}
              {movie.Director && (
                <div>
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
                </div>
              )}
            </div>
            <Button
              variant="secondary"
              className="back-button"
              onClick={() => navigate("/movies")}
            >
              Back to Movies
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
