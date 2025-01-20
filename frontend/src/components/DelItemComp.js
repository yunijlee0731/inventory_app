import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function DelItemComp({ currSelectedRow }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          if (currSelectedRow) {
            console.log("Performing action for:", currSelectedRow);
          }
          handleShow();
        }}
        disabled={!currSelectedRow}
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
      >
        Delete Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {/* TODO: CHANGE FORM ACTION */}
          <Form action="/api/auth/signup" method="post">
            {/* Password Input */}
            <Form.Group className="mb-3 text-start" controlId="formPassword">
              <Form.Label>Item ID:</Form.Label>
              <Form.Control
                type="text"
                name="item_id"
                placeholder="Item ID"
                // value={password} // Bind to state
                // onChange={(e) => setPassword(e.target.value)} // Update state on input
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DelItemComp;
