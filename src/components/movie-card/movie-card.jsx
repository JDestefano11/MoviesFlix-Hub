import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const getFavoritesFromStorage = () => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const MovieCard = ({ movie }) => {
  const [favorites, setFavorites] = useState(getFavoritesFromStorage());
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav) => fav._id === movie._id));
  }, [favorites, movie._id]);

  const handleAddFavorite = () => {
    if (!favorites.some((fav) => fav._id === movie._id)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      saveFavoritesToStorage(updatedFavorites);
      setIsFavorite(true);
    }
  };

  const handleRemoveFavorite = () => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== movie._id);
    setFavorites(updatedFavorites);
    saveFavoritesToStorage(updatedFavorites);
    setIsFavorite(false);
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
