import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row } from "react-bootstrap";
import "./login-view.scss";
import { useNavigate } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch("https://moviesflix-hub-fca46ebf9888.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
          navigate("/movies");
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Form onSubmit={handleSubmit} className="login-form">
          <div className="text-center mb-4">
            <h1>Welcome to MyFlix-Hub</h1>
            <h6>To get started, please sign in</h6>
          </div>

          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3 password-group">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Sign In
          </Button>

          <div className="text-center">
            <Link to="/signup" className="text-decoration-none">
              New to myFlix-Hub? Sign up now.
            </Link>
          </div>
        </Form>
      </Row>
    </Container>
  );
};
