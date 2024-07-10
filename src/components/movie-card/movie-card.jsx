import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-card.scss";

const API_URL = "https://moviesflix-hub-fca46ebf9888.herokuapp.com"; // Replace with your backend URL

export const MovieCard = ({
  movie,
  onAddFavorite,
  onRemoveFavorite,
  username,
  authToken,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(checkIsFavorite(movie._id));
  }, [movie._id, onRemoveFavorite]);

  const checkIsFavorite = (movieId) => {
    if (onRemoveFavorite && Array.isArray(onRemoveFavorite)) {
      return onRemoveFavorite.some((fav) => fav._id === movieId);
    }
    return false;
  };

  const handleAddFavorite = async () => {
    try {
      console.log("Adding movie to favorites:", movie);
      setIsFavorite(true);
      const response = await fetch(`${API_URL}/users/${username}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ movieId: movie._id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }

      onAddFavorite(movie);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      console.log("Removing movie from favorites:", movie._id);
      setIsFavorite(false);
      const response = await fetch(
        `${API_URL}/users/${username}/favorites/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }

      onRemoveFavorite(movie._id);
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      // Handle error (e.g., show an error message to the user)
    }
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
  username: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
};
