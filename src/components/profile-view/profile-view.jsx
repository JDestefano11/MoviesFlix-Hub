import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendar,
  faLock,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import "./profile-view.scss";

export const ProfileView = ({
  user,
  token,
  setUser,
  onLoggedOut,
  favorites,
  updateFavorites,
}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday || new Date());
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const navigate = useNavigate();

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
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setFeedbackMessage("Your account has been deleted");
          onLoggedOut();
        } else {
          throw new Error("Failed to delete account");
        }
      })
      .catch((error) => {
        setFeedbackMessage("Error: " + error.message);
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
      setFeedbackMessage("No changes detected in the profile.");
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
      `https://moviesflix-hub-fca46ebf9888.herokuapp.com/users/${username}/update-username`,
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
    if (!favorites || favorites.length === 0) {
      return <div>No favorite movies added.</div>;
    }

    return favorites.map((movie) => (
      <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
        <MovieCard
          movie={movie}
          username={user.username}
          authToken={token}
          favorites={favorites}
          updateFavorites={updateFavorites}
        />
      </Col>
    ));
  };

  return (
    <Container className="profile-view">
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header as="h2">
              <FontAwesomeIcon icon={faUser} /> Update Profile
            </Card.Header>
            <Card.Body>
              {feedbackMessage && (
                <Alert variant="info">{feedbackMessage}</Alert>
              )}
              <Form onSubmit={handleUpdate}>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formUpdateUsername"
                >
                  <Form.Label column sm={2}>
                    <FontAwesomeIcon icon={faUser} /> Username
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      value={username}
                      readOnly
                      className="username-display"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formUpdatePassword"
                >
                  <Form.Label column sm={2}>
                    <FontAwesomeIcon icon={faLock} /> Password
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

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formUpdateEmail"
                >
                  <Form.Label column sm={2}>
                    <FontAwesomeIcon icon={faEnvelope} /> Email
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
                    <FontAwesomeIcon icon={faCalendar} /> Birthday
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Button type="submit" className="w-100 mb-3 update-button">
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Button
                variant="danger"
                className="w-100 delete-button"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete your account?"
                    )
                  ) {
                    handleDelete();
                  }
                }}
              >
                Delete Account
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header as="h3">
              <FontAwesomeIcon icon={faFilm} /> Favorite Movies
            </Card.Header>
            <Card.Body>
              <Row xs={1} md={2} lg={3} className="g-4">
                {renderFavoriteMovies()}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
