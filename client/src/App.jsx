import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Books from "./components/Books";
import Author from "./components/Author";

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/books">Books</Link>
          <Link to="/authors">Authors</Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Author />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
