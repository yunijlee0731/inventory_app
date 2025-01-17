import React from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUp() {
  return (
    <Form action="/api/auth/signup" method="post">
      {/* First Name Input */}
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>First Name:</Form.Label>
        <Form.Control
          type="text"
          name="firstname"
          placeholder="Enter your first name"
          required
        />
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="text"
          name="lastname"
          placeholder="Enter your Last name"
          required
        />
      </Form.Group>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type="text"
        name="username"
        placeholder="Enter your username"
        required
      />
      <Form.Label>Password: </Form.Label>
      <Form.Control
        type="password"
        name="password"
        placeholder="Enter your password"
        required
      />
      {/* Submit Button */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignUp;
