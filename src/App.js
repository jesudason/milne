import "./custom.scss";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import { NotFound } from "./Pages/NotFound";
import sanityClient from "./Client";
import { LayoutDefault } from "./Layouts/LayoutDefault";
import { Navigation } from "./Layouts/Navbar";
import { Footer } from "./Layouts/Footer";
import "./overrides.scss";
import "./typography.scss";

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
            content[]{
              ...,
              markDefs[]{
                ...,
                _type == "internalLink" => {
                  "slug": @.reference->slug
                }
              }
            },
            pageBuilder
        }`
      )
      .then((data) => {
        setPages(data);
      })
      .catch(console.error);
  }, []);
  // console.log(pages);
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
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
