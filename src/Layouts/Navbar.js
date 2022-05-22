import "./Navbar.scss";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import sanityClient from "../Client";

const Navigation = () => {
  const [mainNav, setMainNav] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings"]{
          mainNav[]->{
            _id,
            slug,
            title,
            subtitle,
            pageType,
            mainImage,
            content,
            pageBuilder
          }
        }`
      )
      .then((data) => {
        setMainNav(data[0].mainNav);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <Navbar collapseOnSelect fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" href="/">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <Nav className="align-items-center" defaultActiveKey="/home">
              {mainNav &&
                mainNav.map((page, index) => (
                  <Nav.Link
                    key={index}
                    as={Link}
                    to={"/" + page.slug.current}
                    href={"/" + page.slug.current}
                  >
                    {page.title}
                  </Nav.Link>
                ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
