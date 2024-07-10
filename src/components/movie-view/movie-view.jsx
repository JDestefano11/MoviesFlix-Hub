import React from "react";
import { SimilarMoviesView } from "../similar-movies/similar-movies";
import { Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  console.log("movieId:", movieId);
  console.log("movies:", movies);

  const movie = movies.find((movie) => movie._id === movieId);

  console.log("selected movie:", movie);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row className="my-5">
        <Col md={6} className="mb-3">
          <img src={movie.ImageUrl} alt={movie.Title} />
        </Col>
        <Col md={5}>
          <h1 className="mb-3">{movie.Title}</h1>
          <p className="text-muted">{movie.Description}</p>
          <p className="mt-4">
            <strong>Genre:</strong> {movie.Genre.Name}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director.Name}
          </p>
          <p className="text-muted">{movie.Director.Bio}</p>
        </Col>
        <Col md={12} className="mb-2">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end me-4">
            <Link to={`/`}>
              <button className="btn btn-primary">Back</button>
            </Link>
          </div>
        </Col>
        <Col md={12}>
          <SimilarMoviesView movieId={movie._id} />
        </Col>
      </Row>
    </Container>
  );
};
