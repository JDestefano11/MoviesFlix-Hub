import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchView } from "../search-view/search-view";
import "./navigation.scss";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prevExpanded) => !prevExpanded);
  const handleNavClick = () => setExpanded(false);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded}
      onToggle={handleToggle}
      className="navbar-fullwidth"
    >
      <Container fluid className="navbar-container">
        <Navbar.Brand as={Link} to="/" onClick={handleNavClick}>
          MoviesFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={handleNavClick}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movies" onClick={handleNavClick}>
              Movies
            </Nav.Link>
          </Nav>
          {user && (
            <Form className="d-flex mb-2 mb-lg-0 me-lg-3">
              <SearchView onSearch={onSearch} />
            </Form>
          )}
          <Nav className="ms-auto">
            {!user ? (
              <Nav.Item>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-info"
                  className="nav-button"
                  onClick={handleNavClick}
                >
                  Login
                </Button>
              </Nav.Item>
            ) : (
              <>
                <Nav.Item className="me-2 mb-2 mb-lg-0">
                  <Button
                    as={Link}
                    to="/profile"
                    variant="outline-info"
                    className="nav-button"
                    onClick={handleNavClick}
                  >
                    Profile
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      onLoggedOut();
                      handleNavClick();
                    }}
                    className="nav-button"
                  >
                    Logout
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
