import React, { useState, useEffect } from "react";
import Navigation from "./Components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { People } from "./Pages/People";
import { Person } from "./Pages/Person";
import { NotFound } from "./Pages/NotFound";
import { About } from "./Pages/About";
import { Footer } from "./Components/Footer";
import sanityClient from "./Client";
import { Link } from "react-router-dom";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function App() {
  const [pages, setPages] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "siteSettings"]{
          mainNav[]->{
            _id,
            slug,
            title,
            navigation,
          }
        }`
      )
      .then((data) => {
        console.log("data");
        console.log(data);
        setPages(data[0].mainNav);
      })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <div className="App wrapper d-flex flex-column">
        <header>
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
                  {pages &&
                    pages.map(
                      (page, index) =>
                        page.navigation === "navbar" && (
                          <Nav.Link
                            key={index}
                            as={Link}
                            to={"/" + page.slug.current}
                            href={"/" + page.slug.current}
                          >
                            {page.title}
                          </Nav.Link>
                        )
                    )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/*"
              element={<NotFound title="Page not Found" type="content" />}
            />
            <Route path="/" element={<Home title="Home" type="index" />} />
            {pages &&
              pages.map((page, index) => (
                <Route
                  path={"/" + page.slug.current}
                  key={index}
                  element={page.title}
                  title={page.title}
                  type="content"
                />
              ))}

            {/* <Route path="/" element={<Home title="Home" type="index" />} />
            <Route
              path="/people"
              element={<People title="Meet the Team" type="content" />}
            />
            <Route
              path="/people/:slug"
              element={<Person title="" type="content" />}
            /> */}
          </Routes>
        </main>
        <footer className="bg-dark">
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
