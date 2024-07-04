import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn, switchToSignup }) => {
<<<<<<< HEAD
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
=======
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
>>>>>>> 04fb6dfeb4f05acef1536e74e9489697f955d49d

  const handleSubmit = async (event) => {
    event.preventDefault();

<<<<<<< HEAD
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
=======
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
>>>>>>> 04fb6dfeb4f05acef1536e74e9489697f955d49d
        }
      );

<<<<<<< HEAD
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
=======
      const data = await response.json();
>>>>>>> 04fb6dfeb4f05acef1536e74e9489697f955d49d

      if (!response.ok) {
        throw new Error("Login failed");
      }

<<<<<<< HEAD
            if (!response.ok) {
                throw new Error("Login failed");
            }

            const { token } = data;
            localStorage.setItem("user", JSON.stringify({ username }));
            localStorage.setItem("token", token);

            onLoggedIn({ username }, token);
        } catch (error) {
            setError("Login failed. Please try again.");
            console.error("Login error:", error);
        }
    };
=======
      const { token } = data;
      localStorage.setItem("user", JSON.stringify({ username }));
      localStorage.setItem("token", token);

      onLoggedIn({ username }, token);
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

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
>>>>>>> 04fb6dfeb4f05acef1536e74e9489697f955d49d

          {error && <div className="error-message">{error}</div>}

          <Button variant="primary" type="submit" className="login-button">
            Sign In
          </Button>
        </Form>

<<<<<<< HEAD
                    {error && <div className="error-message">{error}</div>}

                    <Button variant="primary" type="submit" className="login-button">
                        Sign In
                    </Button>
                </Form>

                <div className="signup-link">
                    <span className="signup-text">New to MoviesFlix? </span>
                    {/* Link to SignupView */}
                    <Link to="/signup" className="signup-link-text">
                        Sign up now.
                    </Link>
                </div>
            </div>
=======
        <div className="signup-link">
          <span className="signup-text">New to MoviesFlix? </span>
          {/* Link to SignupView */}
          <Link to="/signup" className="signup-link-text">
            Sign up now.
          </Link>
>>>>>>> 04fb6dfeb4f05acef1536e74e9489697f955d49d
        </div>
      </div>
    </div>
  );
};
