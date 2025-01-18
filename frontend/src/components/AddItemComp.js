import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function AddItemComp() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
      >
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {/* TODO: CHANGE FORM ACTION */}
          <Form
            action="/api/inventory/add-item"
            method="post"
            style={{ padding: "10px" }}
          >
            {/* First Name Input */}
            <Form.Group className="mb-3 text-start" controlId="formItemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control
                type="text"
                name="item_name"
                placeholder="Enter item name"
                // value={firstname} // Bind to state
                // onChange={(e) => setFirstname(e.target.value)} // Update state on input
                required
              />
            </Form.Group>

            {/* Last Name Input */}
            <Form.Group
              className="mb-3 text-start"
              controlId="formItemDescriptionName"
            >
              <Form.Label>Item Description:</Form.Label>
              <Form.Control
                type="text"
                name="item_des"
                placeholder="Describe item"
                // value={lastname} // Bind to state
                // onChange={(e) => setLastname(e.target.value)} // Update state on input
                required
              />
            </Form.Group>

            {/* Username Input */}
            <Form.Group className="mb-3 text-start" controlId="formUserName">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="Enter item quantity"
                // value={username} // Bind to state
                // onChange={(e) => setUsername(e.target.value)} // Update state on input
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddItemComp;
