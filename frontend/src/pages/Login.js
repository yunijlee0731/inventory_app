import React, { useEffect, useState } from "react";

function Login() {
  console.log("!!!!!!!!!!!Here");
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);
  console.log(backendData);

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

export default Login;
