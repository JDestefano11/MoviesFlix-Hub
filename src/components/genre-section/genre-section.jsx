import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const GenreSection = ({
  genreName,
  movies,
  username,
  token,
  favorites,
  updateFavorites,
}) => (
  <div className="genre-section mb-4">
    <h3 style={{ color: "#e2b400" }}>{genreName}</h3>
    <Row>
      {movies.map((movie) => (
        <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="mb-4">
          <MovieCard
            movie={movie}
            username={username}
            authToken={token}
            token={token}
            favorites={favorites}
            updateFavorites={updateFavorites}
          />
        </Col>
      ))}
    </Row>
  </div>
);
