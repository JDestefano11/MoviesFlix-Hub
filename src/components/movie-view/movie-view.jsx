import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  if (!movie) return <div>Movie not found</div>;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
                    {formatDate(movie.Director.BirthDate)}
                  </p>
                  <p>
                    <strong>Director's Birthplace:</strong>{" "}
                    {movie.Director.BirthPlace}
                  </p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Link to="/" className="back-button" style={{ cursor: "pointer" }}>
        Back
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      ImageUrl: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Occupation: PropTypes.string,
        BirthDate: PropTypes.string,
        BirthPlace: PropTypes.string,
      }),
    })
  ).isRequired,
};
