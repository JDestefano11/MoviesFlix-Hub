import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const SimilarMoviesView = ({
  currentMovie,
  movies,
  username,
  authToken,
}) => {
  const similarMovies = movies
    .filter(
      (movie) =>
        movie._id !== currentMovie._id &&
        movie.Genre.Name === currentMovie.Genre.Name
    )
    .slice(0, 4);

  if (similarMovies.length === 0) {
    return null;
  }

  return (
    <div className="similar-movies">
      <h3 className="mb-4">Similar Movies</h3>
      <Row>
        {similarMovies.map((movie) => (
          <Col
            key={movie._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="mb-3 mb-sm-0 safari-fix"
          >
            <MovieCard
              movie={movie}
              username={username}
              authToken={authToken}
              isSimilarMovie={true}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
