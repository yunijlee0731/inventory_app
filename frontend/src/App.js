import "./App.css";
// import { Link } from 'react-router-dom'

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ViewAllInventory from "./pages/ViewAllInventory";
import TableDemo from "./pages/TableDemo";

import UserInventory from "./pages/UserInventory";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user-inventory" element={<UserInventory />} />
          <Route path="/view-all-inventory" element={<ViewAllInventory />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
