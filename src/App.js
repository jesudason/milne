import React from "react";
import Navigation from "./Components/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./Pages/Home";
import { People } from "./Pages/People";
import { Person } from "./Pages/Person";
import { NotFound } from "./Pages/NotFound";
import { About } from "./Pages/About";
import { Footer } from "./Components/Footer";

function App() {
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
            <Route
              path="/about"
              element={<About title="About" type="content" />}
            />
            <Route path="/" element={<Home title="Home" type="index" />} />
            <Route
              path="/people"
              element={<People title="Meet the Team" type="content" />}
            />
            1
            <Route
              path="/people/:slug"
              element={<Person title="" type="content" />}
            />
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
