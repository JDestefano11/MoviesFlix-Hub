import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchView } from "../search-view/search-view";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="mb-4"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          MoviesFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/movies" onClick={() => setExpanded(false)}>
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
                  className="w-100 mb-2 mb-lg-0"
                  onClick={() => setExpanded(false)}
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
                    className="w-100"
                    onClick={() => setExpanded(false)}
                  >
                    Profile
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      onLoggedOut();
                      setExpanded(false);
                    }}
                    className="w-100"
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
