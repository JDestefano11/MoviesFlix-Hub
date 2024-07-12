import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useParams } from "react-router";

export function SimilarMoviesView({ movies }) {
  const { movieId } = useParams();
  const selectedMovie = movies.find((item) => item.id === movieId);

  let SimilarMovies = movies.filter(
    (movie) => movie.id !== movieId && movie.genre === selectedMovie.genre
  );

  // Check if there are similar movies
  if (SimilarMovies.length === 0) {
    return null;
  }

  return (
    <Row>
      <Col>
        <hr />
        <h2>Similar Movies</h2>
      </Col>

      {SimilarMovies.map((movie) => (
        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} xl={3}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
}
