import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  movies,
  favorites,
  onUserUpdate,
  onUserDeregister,
  onAddToFavorites,
}) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthdate, setBirthdate] = useState(
    user.BirthDate ? user.BirthDate.substring(0, 10) : ""
  );
  const [message, setMessage] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showDeregistrationForm, setShowDeregistrationForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const favoriteMoviesList = movies.filter((movie) =>
        user.FavoriteMovies.includes(movie._id)
      );
      setFavoriteMovies(favoriteMoviesList);
    }
  }, [movies, user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      Username: username,
      Password: password,
      Email: email,
      BirthDate: birthdate,
    };

    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      onUserUpdate(data);
      setMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Error updating profile. Please try again.");
    }
  };

  const handleDeregister = async () => {
    try {
      const response = await fetch(
        `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${user._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to deregister user");
      }

      onUserDeregister();
      navigate("/");
    } catch (error) {
      console.error("Error deregistering user:", error);
      setMessage("Error deregistering account. Please try again.");
    }
  };

  const renderFavoriteMovies = () => {
    return favorites.map((movie) => (
      <MovieCard
        key={movie._id}
        movie={movie}
        onAddToFavorites={onAddToFavorites}
        showButton={true}
      />
    ));
  };

  const toggleRegistrationForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
    setShowDeregistrationForm(false);
  };

  const toggleDeregistrationForm = () => {
    setShowDeregistrationForm(!showDeregistrationForm);
    setShowRegistrationForm(false);
  };

  return (
    <Container className="profile-view">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>User Profile</h2>
          {message && <Alert variant="success">{message}</Alert>}
          <Button
            variant="outline-primary"
            onClick={toggleRegistrationForm}
            className="profile-actions"
          >
            Update Username
          </Button>{" "}
          <Button
            variant="outline-danger"
            onClick={toggleDeregistrationForm}
            className="profile-actions"
          >
            Deregister
          </Button>{" "}
          {showRegistrationForm && (
            <Form onSubmit={handleUpdate}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBirthdate">
                <Form.Label>Date of Birth:</Form.Label>
                <Form.Control
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="update-button">
                Update
              </Button>
            </Form>
          )}
          {showDeregistrationForm && (
            <div className="delete-form">
              {" "}
              {/* Apply delete-form class */}
              <p>Are you sure you want to deregister your account?</p>
              <Button variant="danger" onClick={handleDeregister}>
                Deregister
              </Button>{" "}
            </div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center favorite-movies">
        <Col md={8}>
          <h3>Favorite Movies</h3>
          <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
            {renderFavoriteMovies()}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    BirthDate: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserUpdate: PropTypes.func.isRequired,
  onUserDeregister: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};