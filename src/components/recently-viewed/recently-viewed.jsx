import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";

export const RecentlyViewedMovies = ({ token, favorites, updateFavorites }) => {
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const storedRecentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    console.log("Stored recently viewed movies:", storedRecentlyViewed);
    setRecentlyViewed(storedRecentlyViewed);
  }, []);

  // If there are no recently viewed movies, return null (render nothing)
  if (recentlyViewed.length === 0) {
    console.log("No recently viewed movies, rendering nothing");
    return null;
  }

  // Filter out any invalid movie objects
  const validMovies = recentlyViewed.filter((movie) => movie && movie._id);

  // If there are no valid movies after filtering, return null
  if (validMovies.length === 0) {
    console.log("No valid recently viewed movies, rendering nothing");
    return null;
  }

  console.log("Rendering recently viewed movies:", validMovies);

  return (
    <div className="recently-viewed mt-4">
      <h2 style={{ color: "#E2B400" }}>Recently Viewed Movies</h2>
      <Row>
        {validMovies.map((movie) => (
          <Col xs={12} sm={6} md={4} lg={3} key={movie._id} className="mb-4">
            <MovieCard
              movie={movie}
              token={token}
              favorites={favorites}
              updateFavorites={updateFavorites}
              hideFavoriteButton={true}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
