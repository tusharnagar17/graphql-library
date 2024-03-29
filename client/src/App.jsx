import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import Books from "./components/Books";
import Author from "./components/Author";
import Login from "./components/Login";
import { useQuery } from "@apollo/client";
import BookForm from "./components/BookForm";

const App = () => {
  const navStyle = {
    padding: 5,
  };

  // query from schema

  return (
    <div>
      <Router>
        <div>
          {/* <Link style={navStyle} to="/login">
            Login
          </Link> */}
          <Link style={navStyle} to="/books">
            <button>Books</button>
          </Link>
          <Link style={navStyle} to="/authors">
            <button>Authors</button>
          </Link>
          <Link style={navStyle} to="/addbook">
            <button>Add a book</button>
          </Link>
        </div>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/books" element={<Books />} />
          <Route path="/authors" element={<Author />} />
          <Route path="/addbook" element={<BookForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
