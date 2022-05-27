import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import sanityClient from "../Client";
import { urlFor } from "../helpers";

export const Navigation = () => {
  const [mainNav, setMainNav] = useState(null);
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings" ]{
          mainNav[]->{
            _id,
            slug,
            title,
          },
          logo,
          title
        }`
      )
      .then((data) => {
        setSiteData(data[0]);
        setMainNav(data[0]?.mainNav);
      })
      .catch(console.error);
  }, []);
  const logo = siteData && siteData.logo;
  const title = siteData && siteData.title;
  let logoUrl = "";
  if (logo) {
    logoUrl = urlFor(logo).url();
  }
  console.log("siteData", logo);
  return (
    <div className="Navigation">
      <Navbar collapseOnSelect fixed="top" bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/" href="/">
          {logo ? <img src={logoUrl} /> : <span>{title}</span>}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
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
      </Navbar>
    </div>
  );
};
