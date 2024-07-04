import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-card.scss";

export const MovieCard = ({ movie, onAddToFavorites, showButton = true }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
    if (favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [movie._id]);

  const handleToggleFavorite = () => {
    const favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
    if (isFavorite) {
      favoriteMovies.splice(favoriteMovies.indexOf(movie._id), 1);
    } else {
      favoriteMovies.push(movie._id);
    }
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    setIsFavorite(!isFavorite);
    onAddToFavorites(movie, !isFavorite);
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
        {showButton && (
          <Button
            onClick={handleToggleFavorite}
            className={`movie-button ${isFavorite ? "favorite" : ""}`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
  onAddToFavorites: PropTypes.func.isRequired,
  showButton: PropTypes.bool,
};