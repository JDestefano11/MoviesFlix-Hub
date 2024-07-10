import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com//users/${username}/movies/{movie._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ movieId: movie._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }

      onAddFavorite(movie);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      console.log("Removing movie from favorites:", movie._id);
      setIsFavorite(false);
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com//users/${username}/movies/:movieId/users/${username}/movies/{movie._id}`,
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
    }
  };

  return (
    <Card>
      <Card.Img
        variant="top"
        src={movie.ImageUrl || "default-image-url.png"}
        alt={movie.Title}
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
        <Link to={`/movies/${movie._id}`}>
          <Button variant="link">View Details</Button>
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
