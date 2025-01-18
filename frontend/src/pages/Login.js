import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // State to manage API response messages
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("success");

  // TODO: change method
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/auth/login", requestOptions);
      const data = await response.json();
      console.log(data.success);
      console.log(data.username);
      console.log(data.id);
      if (data.success === true) {
        setMessage(data.message);
        setMessageVariant("success");
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem("id", data.id);
        navigate("/user-inventory");
      } else if (data.success === false) {
        setMessage(data.message);
        setMessageVariant("danger");
      }
    } catch (error) {
      setMessage(
        "An unexpected error occurred while logging in. Please try again."
      );
      setMessageVariant("danger");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title className="fs-1">Login</Card.Title>

            {/* Display API response message */}
            {message && <Alert variant={messageVariant}>{message}</Alert>}

            <Form action="/api/auth/signup" method="post">
              {/* Username Input */}
              <Form.Group className="mb-3 text-start" controlId="formUserName">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username} // Bind to state
                  onChange={(e) => setUsername(e.target.value)} // Update state on input
                  required
                />
              </Form.Group>

              {/* Password Input */}
              <Form.Group className="mb-3 text-start" controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password} // Bind to state
                  onChange={(e) => setPassword(e.target.value)} // Update state on input
                  required
                />
                <Form.Text className="text-muted text-start">
                  Hint: Password must be at least 8 characters, contain numbers,
                  and an uppercase letter.
                </Form.Text>
              </Form.Group>

              {/* Submit Button */}
              <Button
                variant="primary"
                type="submit"
                onClick={handleButtonClick}
              >
                Login
              </Button>
              <Link className="App-link mt-3 d-block text-primary" to="/signup">
                Create Account
              </Link>
              <Link
                className="App-link mt-3 d-block text-primary"
                to="/viewallinventory"
              >
                Continue as a Visitor
              </Link>
            </Form>
          </Card.Body>
        </Card>
      </header>
    </div>
  );
}

export default Login;
