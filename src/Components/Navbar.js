import "./Navbar.scss";
import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
// import Nav from 'react-bootstrap/Nav'
// import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="#home">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="align-items-center">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/people">
                Meet the Team
              </Nav.Link>
              <NavDropdown title="Services" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/services">
                  Services
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
