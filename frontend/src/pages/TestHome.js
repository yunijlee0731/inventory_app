import React from "react";
import { Link } from "react-router-dom";

function TestHome() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Replace <a> tags with <Link> */}
        <Link className="App-link" to="/login">
          Please Login Here!
        </Link>
        <br />
        <Link className="App-link" to="/signup">
          Please Signup Here!
        </Link>
      </header>
    </div>
  );
}

export default TestHome;
