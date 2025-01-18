import "./App.css";
// import { Link } from 'react-router-dom'

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TestHome from "./pages/TestHome";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
