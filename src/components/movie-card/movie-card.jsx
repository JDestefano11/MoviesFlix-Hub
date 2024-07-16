import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { MovieBoard } from "../movie-board/movie-board";

export const MovieCard = ({
  movie,
  username,
  authToken,
  favorites,
  updateFavorites,
  isMovieOfTheDay = false,
  isSimilarMovie = false,
}) => {
  const [isFavorite, setIsFavorite] = useState(
    Array.isArray(favorites) && favorites.some((fav) => fav._id === movie._id)
  );

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const url = `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}/favorites/${movie._id}`;
      const method = isFavorite ? "DELETE" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        setIsFavorite(!isFavorite);
        if (updateFavorites) {
          const updatedFavorites = isFavorite
            ? favorites.filter((fav) => fav._id !== movie._id)
            : [...favorites, movie];
          updateFavorites(updatedFavorites);
        }
      } else {
        throw new Error("Failed to update favorites");
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      alert(error.message);
    }
  };

  return (
    <Link
      to={`/movies/${movie._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card
        className="movie-card h-100 shadow-sm"
        style={{
          backgroundColor: "white",
          color: "#1A1A1A",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        }}
      >
        <Card.Img
          variant="top"
          src={movie.ImageUrl || "default-image-url.png"}
          alt={movie.Title}
          className="card-img-top"
          style={{ height: "400px", objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <Card.Title className="mb-0">{movie.Title}</Card.Title>
            {!isMovieOfTheDay &&
              !isSimilarMovie && ( // Add !isSimilarMovie condition here
                <Button
                  variant={isFavorite ? "warning" : "outline-warning"}
                  size="sm"
                  onClick={handleFavoriteToggle}
                  style={{
                    backgroundColor: isFavorite ? "#FFD700" : "transparent",
                    borderColor: "#FFD700",
                    color: isFavorite ? "#1A1A1A" : "#FFD700",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = isFavorite
                      ? "#E2B400"
                      : "#FFD700";
                    e.target.style.color = "#1A1A1A";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = isFavorite
                      ? "#FFD700"
                      : "transparent";
                    e.target.style.color = isFavorite ? "#1A1A1A" : "#FFD700";
                  }}
                >
                  <FontAwesomeIcon
                    icon={isFavorite ? solidHeart : regularHeart}
                  />
                </Button>
              )}
          </div>
          <div className="d-flex flex-wrap justify-content-start align-items-center mb-3">
            <Badge bg="warning" text="dark" className="me-2 mb-2">
              {movie.Year}
            </Badge>
            <Badge bg="warning" text="dark" className="me-2 mb-2">
              {movie.Genre.Name}
            </Badge>
            <Badge bg="warning" text="dark" className="mb-2">
              Rating: {movie.Rating}
            </Badge>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
};
