const API_URL = "https://moviesflix-hub-fca46ebf9888.herokuapp.com";

export const addToFavorites = async (username, movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add movie to favorites");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding movie to favorites:", error);
    throw error;
  }
};

export const removeFromFavorites = async (username, movieId) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove movie from favorites");
    }
    return response.json();
  } catch (error) {
    console.error("Error removing movie from favorites:", error);
    throw error;
  }
};
