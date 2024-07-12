import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://moviesflix-hub-fca46ebf9888.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);

        if (data.username && data.email) {
          alert("Signup successful");
          navigate("/login");
        } else {
          throw new Error("Signup failed");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Container className="signup-view">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <div className="signup-container">
            <h2 className="signup-heading">Create Account</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="signup-input"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="signup-input"
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="signup-input"
                />
              </Form.Group>

              <Form.Group controlId="formBirthday">
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                  className="signup-input"
                />
              </Form.Group>

              {error && <div className="signup-error">{error}</div>}

              <Button variant="primary" type="submit" className="signup-button">
                Sign Up
              </Button>
            </Form>

            <Link to="/login">
              <Button variant="link" className="signup-link">
                Already have an account? Login here.
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
