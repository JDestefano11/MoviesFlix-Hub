import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-board.scss";

export const MovieBoard = ({
  movie,
  username,
  token,
  favorites,
  updateFavorites,
}) => {
  const [currentMovie, setCurrentMovie] = useState(movie);
  const [expirationTime, setExpirationTime] = useState(null);

  useEffect(() => {
    const storedMovie = JSON.parse(localStorage.getItem("movieOfTheDay"));
    const now = new Date().getTime();

    if (!storedMovie || now > storedMovie.expiresAt) {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);

      const newMovieOfTheDay = {
        movie: movie,
        expiresAt: tomorrow.getTime(),
      };

      localStorage.setItem("movieOfTheDay", JSON.stringify(newMovieOfTheDay));
      setCurrentMovie(movie);
      setExpirationTime(tomorrow.getTime());
    } else {
      setCurrentMovie(storedMovie.movie);
      setExpirationTime(storedMovie.expiresAt);
    }
  }, [movie]);

  return (
    <div className="movie-board">
      <div className="movie-board-content">
        <div className="movie-board-header">
          <h2 className="movie-board-title">Movie of the Day</h2>
          {expirationTime && (
            <Countdown
              date={expirationTime}
              className="movie-board-countdown"
            />
          )}
        </div>
        <div className="movie-board-card-wrapper">
          <MovieCard
            movie={currentMovie}
            username={username}
            authToken={token}
            favorites={favorites}
            updateFavorites={updateFavorites}
            isMovieOfTheDay={true}
          />
        </div>
      </div>
      <div
        className="movie-board-backdrop"
        style={{ backgroundImage: `url(${currentMovie.ImagePath})` }}
      ></div>
    </div>
  );
};
