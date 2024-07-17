import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./modal.scss";

export const SimilarMoviesView = ({
  currentMovie,
  movies,
  username,
  authToken,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div className="similar-movies">
      <h3 className="similar-movies__title mb-4">Similar Movies</h3>
      <Row className="similar-movies__row">
        {similarMovies.map((movie) => (
          <Col
            key={movie._id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className="similar-movies__col mb-3 mb-sm-0 safari-fix"
          >
            <div
              onClick={() => handleOpenModal(movie)}
              className="similar-movies__card-wrapper"
            >
              <MovieCard
                movie={movie}
                username={username}
                authToken={authToken}
                isSimilarMovie={true}
              />
            </div>
          </Col>
        ))}
      </Row>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="similar-movies__modal"
      >
        <Modal.Header closeButton className="similar-movies__modal-header">
          <Modal.Title className="similar-movies__modal-title">
            {selectedMovie?.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="similar-movies__modal-body">
          <img
            src={selectedMovie?.ImageUrl || "default-image-url.png"}
            alt={selectedMovie?.Title}
            className="similar-movies__modal-image"
          />
          <div className="similar-movies__modal-details">
            <p>
              <strong>Year:</strong> {selectedMovie?.Year}
            </p>
            <p>
              <strong>Rating:</strong> {selectedMovie?.Rating}
            </p>
            <p>
              <strong>Description:</strong> {selectedMovie?.Description}
            </p>
            <h5 className="similar-movies__modal-subtitle">Genre</h5>
            <p>
              <strong>Name:</strong> {selectedMovie?.Genre?.Name}
            </p>
            <p>
              <strong>Description:</strong> {selectedMovie?.Genre?.Description}
            </p>
            <h5 className="similar-movies__modal-subtitle">Director</h5>
            <p>
              <strong>Name:</strong> {selectedMovie?.Director?.Name}
            </p>
            <p>
              <strong>Occupation:</strong> {selectedMovie?.Director?.Occupation}
            </p>
            <p>
              <strong>Birth Date:</strong> {selectedMovie?.Director?.BirthDate}
            </p>
            <p>
              <strong>Birth Place:</strong>{" "}
              {selectedMovie?.Director?.BirthPlace}
            </p>
            <p>
              <strong>Bio:</strong> {selectedMovie?.Director?.Bio}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
