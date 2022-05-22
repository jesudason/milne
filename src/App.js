import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { NotFound } from "./Pages/NotFound";
import sanityClient from "./Client";
import { Link } from "react-router-dom";
import { LayoutDefault } from "./Layouts/LayoutDefault";
import Navigation from "./Layouts/Navbar";
import Map from "./Components/Map";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

function App() {
  const [pages, setPages] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "pages"]{
            _id,
            slug,
            title,
            subtitle,
            pageType,
            mainImage,
            content,
            pageBuilder
        }`
      )
      .then((data) => {
        setPages(data);
      })
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <div className="App wrapper d-flex flex-column">
        <header>
          <Navigation />
        </header>
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/*"
              element={<NotFound title="Page not Found" type="content" />}
            />
            {pages &&
              pages.map((page, index) =>
                page.pageType == "index" ? (
                  <Route
                    path={"/"}
                    key={index}
                    element={<LayoutDefault props={page} />}
                  />
                ) : (
                  <Route
                    path={"/" + page.slug?.current}
                    key={index}
                    element={<LayoutDefault props={page} />}
                  />
                )
              )}
          </Routes>
        </main>
        <footer className="bg-dark">
          <div className="container">
            <div className="flex-shrink-0 py-4 text-white-50">
              {pages &&
                pages.map(
                  (page, index) =>
                    page.navigation === "footer" && (
                      <Nav.Link
                        key={index}
                        as={Link}
                        to={"/" + page.slug?.current}
                        href={"/" + page.slug?.current}
                      >
                        {page.title}
                      </Nav.Link>
                    )
                )}
              <small>Copyright &copy; Your Website</small>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
