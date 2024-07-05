import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      {" "}
      {/* Added mb-4 for margin bottom */}
      <Container>
        <Navbar.Brand as={Link} to="/">
          MoviesFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movies">
              Movies
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            {!user ? (
              <Nav.Link as={Link} to="/login">
                <Button variant="outline-info">Login</Button>
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/profile">
                  <Button variant="outline-info">Profile</Button>
                </Nav.Link>
                <Button
                  variant="outline-info"
                  onClick={onLogout}
                  style={{
                    padding: "0.375rem 0.75rem",
                    minWidth: "7rem",
                    textAlign: "center",
                  }}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
