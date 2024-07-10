export const getUserFromLocalStorage = () => {
  return localStorage.getItem("user");
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const getFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? storedFavorites.split(",") : [];
};

export const setFavoritesInLocalStorage = (favorites) => {
  localStorage.setItem("favorites", favorites.join(","));
};
