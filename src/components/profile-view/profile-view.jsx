import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, setUser, onLoggedOut }) => {
  const [username, setUsername] = useState(user.username);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthdate, setBirthdate] = useState(
    user.BirthDate ? user.BirthDate.substring(0, 10) : ""
  );
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.favoriteMovies) {
      const fetchFavoriteMovies = async () => {
        try {
          const response = await fetch(
            "https://moviesflix-hub-fca46ebf9888.herokuapp.com/movies",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const movies = await response.json();
          const favoriteMoviesList = movies.filter((movie) =>
            user.favoriteMovies.includes(movie._id)
          );
          setFavoriteMovies(favoriteMoviesList);
        } catch (error) {
          console.error("Error fetching favorite movies:", error);
        }
      };

      fetchFavoriteMovies();
    }
  }, [user, token]);

  const handleDelete = () => {
    fetch(
      `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setUser(null);
          alert("Your account has been deleted");
          onLoggedOut();
        } else {
          throw new Error("Failed to delete account");
        }
      })
      .catch((error) => {
        alert("Something went wrong: " + error.message);
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (
      username === user.username &&
      email === user.email &&
      birthday === user.birthday.split("T")[0] &&
      !password
    ) {
      alert("No changes detected in the profile.");
      return;
    }

    const data = {
      username,
      email,
      birthday,
    };

    if (password) {
      data["password"] = password;
    }

    fetch(
      `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to update profile");
        }
      })
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setFeedbackMessage("Profile updated successfully!");
      })
      .catch((error) => {
        setFeedbackMessage(`Update failed: ${error.message}`);
      });
  };

  const renderFavoriteMovies = () => {
    if (!favoriteMovies || favoriteMovies.length === 0) {
      return <div>No favorite movies added.</div>;
    }

    return favoriteMovies.map((movie) => (
      <Col key={movie._id} className="mb-4">
        <MovieCard movie={movie} showButton={false} />
      </Col>
    ));
  };

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2>Update Profile</h2>

          {feedbackMessage && <Alert variant="info">{feedbackMessage}</Alert>}

          <Form onSubmit={handleUpdate}>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formUpdateUsername"
            >
              <Form.Label column sm={2}>
                Username
              </Form.Label>
              <Col sm={10}>
                <div>
                  <strong>{username}</strong>
                </div>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formUpdatePassword"
            >
              <Form.Label column sm={2}>
                Password
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength="4"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formUpdateEmail">
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formUpdateBirthday"
            >
              <Form.Label column sm={2}>
                Birthday
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Button type="submit" className="w-100 mb-3">
              UPDATE
            </Button>

            <Button
              variant="secondary"
              className="w-100 mb-4"
              onClick={() => navigate("/")}
            >
              CANCEL
            </Button>

            <hr />

            <Button variant="danger" className="w-100" onClick={handleDelete}>
              REMOVE
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <h3>Favorite Movies</h3>
          <Row>{renderFavoriteMovies()}</Row>
        </Col>
      </Row>
    </Container>
  );
};
