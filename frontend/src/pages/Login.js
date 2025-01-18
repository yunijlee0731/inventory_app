import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
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
      if (data.success === true) {
        setMessage(data.message);
        setMessageVariant("success");
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
                  placeholder="Enter your username"
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
                  placeholder="Enter your password"
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
            </Form>
          </Card.Body>
        </Card>
      </header>
    </div>
  );
}

export default Login;
