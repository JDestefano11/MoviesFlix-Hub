export const MovieOfTheDay = ({ movie }) => {
  return (
    <div className="movie-of-the-day">
      <h2>Movie of the Day</h2>
      <img src={movie.ImagePath} alt={movie.Title} />
      <h3>{movie.Title}</h3>
      <p>{movie.Description}</p>
    </div>
  );
};
