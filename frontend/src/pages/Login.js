import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Login() {
    
    // const [backendData, setBackendData] = useState([{}]);
    console.log("Does it reacher here")

    // useEffect(() => {
    //   fetch("/api/auth/login")
    //   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!HEREEE");
      // fetch("/api/auth/login").then(
      //   response => response.json()
      // ).then(
      //   data => {
      //     setBackendData(data); 
      //   }
      // )
    // }, [])

    return (
        <div className="App">
            <header className="App-header">
            {/* React doesn’t allow <head> inside components; move the title to <Helmet> if needed */}
            <h1>Example Login Form</h1>
                <form action="/api/auth/login" method="post">
                    {/* Username Input */}
                    <label htmlFor="username">Username:</label>
                    <br />
                        <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        required
                        />
                    <br />
                    <br />
                        {/* Password Input */}
                        <label htmlFor="password">Password:</label>
                    <br />
                    <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    />
                    <br />
                    <br />
                    {/* Submit Button */}
                    <input type="submit" value="Login" />
                </form>
            </header>
        </div>
      );
    
}

export default Login

