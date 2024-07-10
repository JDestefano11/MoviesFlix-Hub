import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("https://moviesflix-hub-fca46ebf9888.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login failed");
        }
        return response.json(); // parse JSON from the response
      })
      .then((data) => {
        console.log("Login response: ", data);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
        setLoggedIn(true);
      })
      .catch((error) => {
        setError("Login failed. Please try again.");
        console.error("Login error:", error);
      });
  };

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
