import './App.css';
// import { Link } from 'react-router-dom'

import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data); 
      }
    )
  }, [])

  return (
    <Router>
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

      {/* Define routes */}
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Render Login component */}
        {/* You can add a signup route here */}
      </Routes>
    </div>
  </Router>


//   <head>
// 	<title>Welcome Home</title>
//   </head>
//   <body>
// . . <!-- link to login page-->
// 	<a href="/api/auth/login">Please Login Here!</a>
//     <a href="/api/auth/signup">Please Sign Up Here!</a>
//   </body>

  );
}

export default App;
