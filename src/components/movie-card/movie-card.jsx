import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./movie-card.scss";

export const MovieCard = ({ movie, username, authToken }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkIsFavorite();
  }, []);

  const checkIsFavorite = () => {
    const user = localStorage.getItem("user");

    if (
      user &&
      user.FavoriteMovies &&
      user.FavoriteMovies.includes(movie._id)
    ) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const handleAddFavorite = () => {
    fetch(
      `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add favorite movie");
        }
      })
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setIsFavorite(true);
      })
      .catch((error) => {
        alert("Failed to add favorite movie: " + error.message);
      });
  };

  const handleRemoveFavorite = () => {
    fetch(
      `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to remove favorite movie");
        }
      })
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setIsFavorite(false);
      })
      .catch((error) => {
        alert("Failed to remove favorite movie: " + error.message);
      });
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
    ImageUrl: PropTypes.string,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  authToken: PropTypes.string.isRequired,
};
