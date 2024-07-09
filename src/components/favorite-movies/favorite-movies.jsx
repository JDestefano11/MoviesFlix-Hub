import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Alert } from "react-bootstrap";

export const Favorites = ({ user, token }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${user.username}/movies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data = await response.json();
      setFavorites(data.favoriteMovies);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setError("Failed to load favorites. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }
      const updatedFavorites = [...favorites, movieId];
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${user.username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const renderFavorites = () => {
    if (isLoading) {
      return <Spinner animation="border" />;
    }
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }
    if (favorites.length === 0) {
      return <div>No favorites added yet</div>;
    }
    return favorites.map((movieId) => (
      <Card key={movieId} className="mb-3">
        {/* Render movie details or card here */}
        <Card.Body>
          <Button
            variant="danger"
            onClick={() => handleRemoveFavorite(movieId)}
          >
            Remove from Favorites
          </Button>
        </Card.Body>
      </Card>
    ));
  };

  return (
    <div>
      <h2>My Favorites</h2>
      {renderFavorites()}
    </div>
  );
};
