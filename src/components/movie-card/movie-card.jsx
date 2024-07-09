import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-card.scss";

export const MovieCard = ({ movie, onAddFavorite, onRemoveFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddFavorite = () => {
    setIsFavorite(true);
    onAddFavorite(movie._id);
  };

  const handleRemoveFavorite = () => {
    setIsFavorite(false);
    onRemoveFavorite(movie._id);
  };

  return (
    <Card className="movie-card">
      <Card.Img
        variant="top"
        src={movie.ImageUrl || "default-image-url.png"}
        alt={movie.Title}
        className="movie-image"
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Link to={`/movies/${movie._id}`} className="movie-link">
          <Button variant="link" className="movie-button">
            View Details
          </Button>
        </Link>
        {isFavorite ? (
          <Button variant="danger" onClick={handleRemoveFavorite}>
            Remove from Favorites
          </Button>
        ) : (
          <Button variant="primary" onClick={handleAddFavorite}>
            Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};
