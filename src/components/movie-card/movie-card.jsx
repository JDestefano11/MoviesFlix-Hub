import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({
  movie,
  username,
  authToken,
  favorites,
  updateFavorites,
}) => {
  const [isFavorite, setIsFavorite] = useState(
    favorites.some((fav) => fav._id === movie._id)
  );

  const handleAddFavorite = async () => {
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}/favorites/${movie._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        setIsFavorite(true);
        const updatedFavorites = [...favorites, movie];
        updateFavorites(updatedFavorites);
        alert("Movie added to favorites!");
      } else {
        alert("Failed to add movie to favorites.");
      }
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}/favorites/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.ok) {
        setIsFavorite(false);
        const updatedFavorites = favorites.filter(
          (fav) => fav._id !== movie._id
        );
        updateFavorites(updatedFavorites);
        alert("Movie removed from favorites!");
      } else {
        alert("Failed to remove movie from favorites.");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
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
        <Button
          variant={isFavorite ? "danger" : "primary"}
          onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Card.Body>
    </Card>
  );
};
