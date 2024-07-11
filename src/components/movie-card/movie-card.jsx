import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const saveFavoritesToStorage = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const MovieCard = ({ movie, token }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!token) {
      console.warn("Token is undefined. Unable to fetch favorite status.");
      return;
    }

    // Check if the movie is already a favorite
    const checkFavoriteStatus = async () => {
      try {
        const response = await fetch(
          `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/me/favorites/${movie._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [movie._id, token]);

  const handleAddFavorite = async () => {
    try {
      if (!token) {
        throw new Error("Token is undefined. Cannot add to favorites.");
      }

      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/me/favorites/${movie._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add movie to favorites: ${response.statusText}`
        );
      }

      setIsFavorite(true);
      alert("Movie added to favorites!");
    } catch (error) {
      console.error("Error adding favorite:", error);
      alert(error.message);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      if (!token) {
        throw new Error("Token is undefined. Cannot remove from favorites.");
      }

      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/me/favorites/${movie._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to remove movie from favorites: ${response.statusText}`
        );
      }

      setIsFavorite(false);
      alert("Movie removed from favorites!");
    } catch (error) {
      console.error("Error removing favorite:", error);
      alert(error.message);
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
