import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEnvelope,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://moviesflix-hub-fca46ebf9888.herokuapp.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email, birthday }),
        }
      );

      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "An error occurred during signup");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-view">
      <div className="signup-container">
        <h1 className="signup-heading">Join myFlix-Hub</h1>
        <form onSubmit={handleSubmit}>
          {["username", "password", "email"].map((field) => (
            <div key={field} className="form-group">
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon
                    icon={
                      field === "username"
                        ? faUser
                        : field === "password"
                        ? faLock
                        : faEnvelope
                    }
                  />
                </span>
                <input
                  type={
                    field === "password"
                      ? "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={eval(field)}
                  onChange={(e) =>
                    eval(
                      `set${field.charAt(0).toUpperCase() + field.slice(1)}`
                    )(e.target.value)
                  }
                  required
                  className="signup-input"
                />
              </div>
            </div>
          ))}
          <div className="form-group">
            <div className="input-group">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faCalendar} />
              </span>
              <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
                className="signup-input"
              />
            </div>
          </div>
          {error && <div className="signup-error">{error}</div>}
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        <div>
          <Link to="/login" className="signup-link">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
