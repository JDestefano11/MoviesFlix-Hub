import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch(
        "https://moviesflix-hub-fca46ebf9888.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { token, user } = data;

      // Use onLoggedIn to handle local storage and state updates
      onLoggedIn(user, token);

      // Set isLoggedIn state to true upon successful login
      setLoggedIn(true);
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  // Render login form or redirect to /movies if isLoggedIn is true
  if (isLoggedIn) {
    return <Navigate to="/movies" />;
  }

  return (
    <div className="login-view">
      <div className="login-container">
        <h2 className="login-heading">Sign In</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>

          {error && <div className="error-message">{error}</div>}

          <Button variant="primary" type="submit" className="login-button">
            Sign In
          </Button>
        </Form>

        <div className="signup-link">
          <span className="signup-text">New to MoviesFlix? </span>
          <Link to="/signup" className="signup-link-text">
            Sign up now.
          </Link>
        </div>
      </div>
    </div>
  );
};
